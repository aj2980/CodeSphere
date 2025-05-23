import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Editor2 from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { api_base_url } from "../helper";
import { toast } from "react-toastify";
import Split from "react-split";
import ReactMarkdown from "react-markdown";
import CopyableCodeBlock from "../components/CopyableCodeBlock";
import MarkdownRenderer from "../components/MarkdownRenderer";

// function htmlCodeToMarkdown(text) {
//   // Replace <pre><code>cpp ... </code></pre> with ```cpp ... ```
//   let md = text.replace(
//     /<pre><code>(\w+)\s*([\s\S]*?)<\/code><\/pre>/g,
//     (match, lang, code) => `\`\`\`${lang}\n${code.trim()}\n\`\`\``
//   );
//   // Replace <pre><code>...</code></pre> without language
//   md = md.replace(
//     /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
//     (match, code) => `\`\`\`\n${code.trim()}\n\`\`\``
//   );
//   // Replace <br> and <br/> with newlines
//   md = md.replace(/<br\s*\/?>/gi, "\n");
//   // Remove any remaining HTML tags (optional, for safety)
//   md = md.replace(/<\/?[^>]+(>|$)/g, "");
//   return md;
// }

const Editor = () => {
  const [code, setCode] = useState("");
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [output, setOutput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // set to new height
    }
  }, [chatInput]);
  useEffect(() => {
    fetch(`${api_base_url}/getProject`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        projectId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCode(data.project.code);
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        toast.error("Failed to load project.");
      });
  }, [id]);

  const saveProject = () => {
    const trimmedCode = code?.toString().trim();
    console.log("Saving code:", trimmedCode);

    fetch(`${api_base_url}/saveproj`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        projectid: id,
        code: trimmedCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error("Error saving project:", err);
        toast.error("Failed to save the project.");
      });
  };

  const handleSaveShortcut = (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      saveProject();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSaveShortcut);
    return () => {
      window.removeEventListener("keydown", handleSaveShortcut);
    };
  }, [code]);

  const isInputRequired = () => {
    const codeLower = code?.toLowerCase();
    const lang = data?.projLanguage?.toLowerCase();

    if (!codeLower || !lang) return false;

    if (lang === "python") return codeLower.includes("input(");
    if (lang === "cpp") return codeLower.includes("cin>>");
    if (lang === "c") return codeLower.includes("scanf(");
    if (lang === "java") return codeLower.includes("new scanner");
    if (lang === "javascript") return codeLower.includes("prompt(");

    return false;
  };

  const runProject = () => {
    if (!data) {
      toast.error("Project data is not loaded.");
      return;
    }

    const requiresInput = isInputRequired();

    if (requiresInput) {
      const inputValues = userInput.trim().split(/\s+/);
      const requiredInputs = (code.match(/cin>>|scanf\(|input\(|prompt\(/g) || []).length;

      if (inputValues.length < requiredInputs) {
        toast.warn(
          `This code requires ${requiredInputs} inputs. Please provide all required inputs.`
        );
        return;
      }
    }

    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: data.projLanguage,
        version: data.version,
        files: [
          {
            filename:
              data.name +
              (data.projLanguage === "python"
                ? ".py"
                : data.projLanguage === "java"
                  ? ".java"
                  : data.projLanguage === "javascript"
                    ? ".js"
                    : data.projLanguage === "c"
                      ? ".c"
                      : data.projLanguage === "cpp"
                        ? ".cpp"
                        : data.projLanguage === "bash"
                          ? ".sh"
                          : ""),
            content: code,
          },
        ],
        stdin: userInput,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.run) {
          const isError = data.run.code !== 0;
          const outputMessage = isError
            ? data.run.stderr || "An error occurred."
            : data.run.output;
          setOutput(outputMessage);
          setError(isError);
        } else {
          toast.error("Failed to execute code.");
        }
      })
      .catch((err) => {
        console.error("Error running project:", err);
        toast.error("Execution failed.");
      });
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [
  ...prev,
  {
    sender: "user",
    message: chatInput.match(/```/) ? chatInput : "```\n" + chatInput + "\n```"
  }
]);

    console.log("Sending to AI:", chatInput);

    try {
      const response = await fetch(`${api_base_url}/analyzeCode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: chatInput,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setChatMessages((prev) => [...prev, { sender: "bot", message: data.suggestion }]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { sender: "bot", message: "Sorry, I couldn't process your request." },
        ]);
      }
    } catch (error) {
      console.error("Error analyzing code:", error);
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", message: "An error occurred. Please try again later." },
      ]);
    }

    setChatInput("");
  };

  return (
    <>
      <Navbar />
      {/* Fixed top-center action buttons */}
     <div
  className="absolute top-24 left-1/2 transform -translate-x-1/2 flex gap-4 z-50 justify-center"
>
  <button
    className="btnNormal bg-gray-500 hover:bg-gray-600 px-3 py-2 rounded"
    onClick={saveProject}
  >
    Save Project
  </button>
  <button
    className="btnNormal bg-gray-500 hover:bg-gray-600 px-3 py-2 rounded"
    onClick={runProject}
  >
    Run
  </button>
  {!isChatbotVisible && (
    <button
      className="btnNormal bg-gray-500 hover:bg-gray-600 px-3 py-2 rounded"
      onClick={() => setIsChatbotVisible(true)}
      style={{ minWidth: 0 }}
      title="Show AI Bot"
    >
      AI Bot
    </button>
  )}
</div>

      {/* Main horizontal flex container */}
      {/* Main horizontal flex container */}
<div className="flex flex-row w-full mt-[90px]" style={{ height: "calc(100vh - 130px)", overflow: "hidden" }}>
  
  {/* Code Editor Panel */}
  <div className="flex flex-col w-full md:w-1/2 lg:w-1/7 bg-[#1e1e1f] p-4 min-h-0" style={{ height: "100%" }}>
    <h2 className="text-white text-lg mb-4">Code Editor</h2>
    <div className="flex-1 min-h-0 overflow-y-auto">
      <Editor2
        onChange={(newCode) => setCode(newCode || "")}
        theme="vs-dark"
        height="100%"
        width="100%"
        language={data?.projLanguage || "python"}
        value={code}
      />
    </div>
  </div>

  {/* Input/Output Panel */}
  <div className={`flex flex-col bg-[#27272a] p-4 transition-all duration-300 min-h-0 ${isChatbotVisible ? "w-1/3" : "w-full"}`} style={{ height: "100%" }}>
    <div className="mb-4">
      <h2 className="text-white text-lg mb-2">Input</h2>
      <textarea
        className="w-full bg-[#1e1e1f] text-white p-3 rounded border border-gray-600"
        rows={5}
        placeholder="Enter input here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      ></textarea>
    </div>
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-white text-lg">Output</h2>
      </div>
      <div
        className="w-full flex-1 bg-[#1e1e1f] text-white p-3 rounded border border-gray-600 overflow-y-auto min-h-0"
      >
        <MarkdownRenderer content={output} />
      </div>
    </div>
  </div>

  {/* Chatbot Panel */}
  {isChatbotVisible && (
    <div className="flex flex-col w-full md:w-1/3 bg-[#18181b] border-l border-gray-700 min-h-0" style={{ height: "100%" }}>
      <div className="p-3 bg-[#23232a] flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Code Assistant</h3>
        <button
          className="text-gray-400 hover:text-white text-4xl"
          onClick={() => setIsChatbotVisible(false)}
        >
          ×
        </button>
      </div>

      {/* Scrollable Chat Messages */}
      <div className="flex-1 p-3 overflow-y-auto min-h-0">
        {chatMessages.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            Ask me anything about your code!
          </div>
        ) : (
          chatMessages.map((msg, index) => (
            <div key={index} className="mb-3">
              <div
                className={`${
                  msg.sender === "bot"
                    ? "text-[#cc972d] bg-[#232323]"
                    : "text-[#60a5fa] bg-[#232323]"
                } p-3 rounded-lg overflow-x-auto`}
                style={{ wordBreak: "break-word", maxWidth: "100%" }}
              >
                <strong>{msg.sender === "bot" ? "Assistant" : "You"}:</strong>
                <MarkdownRenderer content={msg.message} />
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-3 flex items-center gap-2 border-t border-gray-700">
        <textarea
          ref={textareaRef}
          className="flex-1 bg-[#1e1e1f] text-white p-4 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 resize-none overflow-y-auto"
          placeholder="Ask about your code..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleChatSubmit();
            }
          }}
          rows={2}
          style={{ minHeight: "56px", maxHeight: "140px" }}
        />
        <button
          className="btnNormal bg-blue-500 hover:bg-blue-600 rounded-lg"
          style={{ width: "80px", padding: "10px 0" }}
          onClick={handleChatSubmit}
        >
          Send
        </button>
      </div>
    </div>
  )}
</div>

    </>
  );
};

export default Editor;
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Editor2 from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { api_base_url } from "../helper";
import { toast } from "react-toastify";
import Split from "react-split";
import ReactMarkdown from "react-markdown";

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

    setChatMessages((prev) => [...prev, { sender: "user", message: chatInput }]);

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
      {/* Main horizontal flex container */}
      <div className="flex flex-row h-[calc(100vh-60px)]">
        {/* Code Editor */}
        <div className="flex flex-col w-full md:w-1/2 lg:w-2/5 h-full bg-[#1e1e1f] p-4">
          <h2 className="text-white text-lg mb-4">Code Editor</h2>
          <Editor2
            onChange={(newCode) => setCode(newCode || "")}
            theme="vs-dark"
            height="100%"
            width="100%"
            language={data?.projLanguage || "python"}
            value={code}
          />
        </div>
        {/* Input/Output */}
        <div
          className={`flex flex-col h-full bg-[#27272a] p-4 transition-all duration-300 ${
            isChatbotVisible ? "w-1/3" : "w-full"
          }`}
        >
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
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-white text-lg">Output</h2>
            </div>
            <div
              className="w-full h-full bg-[#1e1e1f] text-white p-3 rounded border border-gray-600 overflow-y-auto"
              style={{ maxHeight: "calc(100% - 40px)" }}
            >
              <pre>{output}</pre>
            </div>
          </div>
        </div>
        {/* Chatbot */}
        {isChatbotVisible && (
          <div className="flex flex-col w-full md:w-1/3 h-full bg-[#18181b] border-l border-gray-700">
            <div className="p-3 bg-[#23232a] flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Code Assistant</h3>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setIsChatbotVisible(false)}
              >
                ×
              </button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto">
              {chatMessages.length === 0 ? (
                <div className="text-gray-400 text-center mt-10">
                  Ask me anything about your code!
                </div>
              ) : (
                chatMessages.map((msg, index) => (
                  <div key={index} className="mb-3">
                    <div
                      className={`whitespace-pre-wrap ${
                        msg.sender === "bot"
                          ? "text-[#facc15] bg-[#232323] p-3 rounded-lg"
                          : "text-[#60a5fa] bg-[#232323] p-3 rounded-lg"
                      }`}
                    >
                      <strong>{msg.sender === "bot" ? "Assistant" : "You"}:</strong>
                      <div dangerouslySetInnerHTML={{ __html: msg.message.replace(/\n/g, "<br>") }} />
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-3 flex items-center gap-2 border-t border-gray-700">
              <input
                type="text"
                className="flex-1 bg-[#1e1e1f] text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                placeholder="Ask about your code..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
              />
              <button
                className="btnNormal bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg"
                onClick={handleChatSubmit}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Run and Save buttons */}
      <div className="fixed top-[100px] right-10 flex gap-4 z-50">
        <button
          className="btnNormal !w-fit !px-[20px] bg-green-500 transition-all hover:bg-green-600"
          onClick={saveProject}
        >
          Save Project
        </button>
        <button
          className="btnNormal !w-fit !px-[20px] bg-blue-500 transition-all hover:bg-blue-600"
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
    </>
  );
};

export default Editor;
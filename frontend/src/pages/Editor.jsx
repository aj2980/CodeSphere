import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Editor2 from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { api_base_url } from "../helper";
import { toast } from "react-toastify";

const Editor = () => {
  const [code, setCode] = useState("");
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [output, setOutput] = useState("");

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

  const runProject = () => {
    if (!data) {
      toast.error("Project data is not loaded.");
      return;
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
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.run) {
          setOutput(data.run.output);
          setError(data.run.code === 1);
        } else {
          toast.error("Failed to execute code.");
        }
      })
      .catch((err) => {
        console.error("Error running project:", err);
        toast.error("Execution failed.");
      });
  };

  return (
    <>
      <Navbar />
      <div
        className="flex items-center justify-between"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="left w-[50%] h-full">
          <Editor2
            onChange={(newCode) => {
              console.log("New Code:", newCode);
              setCode(newCode || "");
            }}
            theme="vs-dark"
            height="100%"
            width="100%"
            language="python"
            value={code}
          />
        </div>
        <div className="right p-[15px] w-[50%] h-full bg-[#27272a]">
          <div className="flex pb-3 border-b-[1px] border-b-[#1e1e1f] items-center justify-between px-[30px]">
            <p className="p-0 m-0">Output</p>
            <button
              className="btnNormal !w-fit !px-[20px] bg-blue-500 transition-all hover:bg-blue-600"
              onClick={runProject}
            >
              Run
            </button>
          </div>
          <pre className="text-white mt-4">{output}</pre>
        </div>
      </div>
    </>
  );
};

export default Editor;

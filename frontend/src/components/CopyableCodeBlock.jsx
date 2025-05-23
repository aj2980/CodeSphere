import { useState } from "react";

const CopyableCodeBlock = ({ code, language = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="relative my-2">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition"
        style={{ zIndex: 2 }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre className="whitespace-pre-wrap break-words rounded bg-[#18181b] p-4 border border-gray-700">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CopyableCodeBlock;
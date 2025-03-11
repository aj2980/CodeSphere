import  { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Editor2 from '@monaco-editor/react';
// import { useParams } from 'react-router-dom';
// import { api_base_url } from '../helper';
// import { toast } from 'react-toastify';

const Editor = () => {
    const [code, setCode] = useState("");
  return (
    
    <>
      <Navbar />
      <div className="flex items-center justify-between" style={{ height: 'calc(100vh - 90px)' }}>
        <div className="left w-[50%] h-full">
          <Editor2
            onChange={(newCode) => {
              console.log('New Code:', newCode); // Debug: Log changes
              setCode(newCode || ''); // Update state
            }}
            theme="vs-dark"
            height="100%"
            width="100%"
            language="python"
            value={code} // Bind editor to state
          />
        </div>
        <div className="right p-[15px] w-[50%] h-full bg-[#27272a]">
          <div className="flex pb-3 border-b-[1px] border-b-[#1e1e1f] items-center justify-between px-[30px]">
            <p className="p-0 m-0">Output</p>
            <button
              className="btnNormal !w-fit !px-[20px] bg-blue-500 transition-all hover:bg-blue-600"
               // Save when clicking the button
            >
              run
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
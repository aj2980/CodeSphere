// import React from 'react';
import Navbar from "../components/Navbar";
import Editor from './Editor';


const Home = () => {
  return (
    <>
    <Navbar />
    <div className="flex items-center px-[100px] justify-between mt-5">
        <h3 className='text-2xl'>👋 Hi, Mahdi</h3>
        <div className="flex items-center">
          <button  className="btnNormal bg-blue-500 transition-all hover:bg-blue-600">Create Project</button>
        </div>
      </div>

      <div className="projects px-[100px] mt-5">
        <div className="project w-full p-[15px] flex items-center justify-between bg-[#0f0e0e] ">
          <div className="flex items-center gap-[15px]">
            <img className='w-[130px] h-[100px] object-cover' src="https://banner2.cleanpng.com/20190623/yp/kisspng-python-computer-icons-programming-language-executa-1713885634631.webp" alt="" />
            <div>
              <h3 className="text-xl">python project</h3>
              <p className="text-[14px] text-gray-50">28 feb 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <button className="btnNormal bg-blue-500 transition-all hover:bg-blue-600">Edit</button>
            <button className="btnNormal bg-red-500 transition-all hover:bg-red-600">Delete</button>
          </div>
          
        </div>
        <div className="project w-full p-[15px] flex items-center justify-between bg-[#0f0e0e] ">
          <div className="flex items-center gap-[15px]">
            <img className='w-[130px] h-[100px] object-cover' src="https://banner2.cleanpng.com/20190623/yp/kisspng-python-computer-icons-programming-language-executa-1713885634631.webp" alt="" />
            <div>
              <h3 className="text-xl">python project</h3>
              <p className="text-[14px] text-gray-50">28 feb 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <button className="btnNormal bg-blue-500 transition-all hover:bg-blue-600">Edit</button>
            <button className="btnNormal bg-red-500 transition-all hover:bg-red-600">Delete</button>
          </div>
          
        </div>
        <div className="project w-full p-[15px] flex items-center justify-between bg-[#0f0e0e] ">
          <div className="flex items-center gap-[15px]">
            <img className='w-[130px] h-[100px] object-cover' src="https://banner2.cleanpng.com/20190623/yp/kisspng-python-computer-icons-programming-language-executa-1713885634631.webp" alt="" />
            <div>
              <h3 className="text-xl">python project</h3>
              <p className="text-[14px] text-gray-50">28 feb 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <button className="btnNormal bg-blue-500 transition-all hover:bg-blue-600">Edit</button>
            <button className="btnNormal bg-red-500 transition-all hover:bg-red-600">Delete</button>
          </div>
          
        </div>
      </div>
      

      

    </>
  )
}

export default Home
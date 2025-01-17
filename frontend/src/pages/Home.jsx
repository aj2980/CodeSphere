
import React from 'react';
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
    <Navbar />
    <div className="flex items-center px-[100px] justify-between mt-5">
        <h3 className='text-2xl'>👋 Hi, Mahdi</h3>
        <div className="flex items-center">
          <button onClick={() => { setIsCreateModelShow(true) }} className="btnNormal bg-blue-500 transition-all hover:bg-blue-600">Create Project</button>
        </div>
      </div>
      <div className="flex items-center gap-[15px]">
                  <button className="btnNormal bg-blue-500 transition-all hover:bg-blue-600" onClick={() => {
                    setIsEditModelShow(true);
                    setEditProjId(project._id);
                    setName(project.name);
                  }}>Edit</button>
                  <button onClick={() => { deleteProject(project._id) }} className="btnNormal bg-red-500 transition-all hover:bg-red-600">Delete</button>
                </div>

      

    </>
  )
}

export default Home
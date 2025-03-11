// import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NoPage from './pages/NoPage'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Editor from './pages/Editor'



function App() {


  return (
    <>
      <BrowserRouter>
        <RouteHandler/>
      </BrowserRouter>

    </>
  )


  
}
const RouteHandler = () => {
  return (
    <>
    <Routes>
    <Route  path="/" element={<Home />} />
    <Route  path="*" element={<NoPage />} />
    <Route  path="Signup" element={<SignUp />} />
    <Route  path="login" element={<Login />} />
    <Route  path="editor/:id" element={<Editor />} />
    </Routes >
    </>
    
)
  
}

export default App

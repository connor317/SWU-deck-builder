import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from "./pages/Home"
import Search from "./pages/Search"
import "./styles.css"

import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar'

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/search" element={<Search/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App

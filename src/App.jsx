import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './components/Auth'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Deals from './pages/Deals'
import Contact from './pages/Contact'
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/deals' element={<Deals />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App

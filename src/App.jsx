import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './components/Auth'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Deals from './pages/Deals'
import Contact from './pages/Contact'
import { ToastContainer } from "react-toastify"
import { UserAuthContext } from './contexts/UserAuthContext'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true;
const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [LikedIds, setLikedIds] = useState([])
  const checkLogin = async () => {
    try {

      const response = await axios.get("http://localhost:3000/api/auth/verify")
      if (response.status === 200) {
        setisLoggedIn(true)
      }
      else {
        setisLoggedIn(false)
      }
    }
    catch (err) {
      console.log("error", err)
      setisLoggedIn(false)    
    }

  }
  useEffect(() => {
    checkLogin()
  }, [])
  useEffect(() => {
    if (!isLoggedIn) {
      setLikedIds([])
      return
    }
    const fetchLikedProducts = async () => {

      try {
        const response = await axios.get("http://localhost:3000/api/products/getLikedProducts/", { withCredentials: true })
        const ids = response.data.likedList.map(p => p._id)

        console.log("the ids are", ids)
        setLikedIds(ids)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchLikedProducts()
  }, [isLoggedIn])
  return (
    <div>
      <UserAuthContext.Provider value={{ isLoggedIn, setisLoggedIn, LikedIds, setLikedIds }}>

        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/deals' element={<Deals />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </UserAuthContext.Provider>
    </div>
  )
}

export default App

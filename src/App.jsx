import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Auth from './components/Auth'
import Home from './pages/Home'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
    </div>
  )
}

export default App

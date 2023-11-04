import React, { useContext, useEffect } from 'react'
import './App.css'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppContext } from './context/firebasecontext'
import Home from './Pages/Home'
import { auth } from './firebase/Config'
import View from './Pages/ViewPost'
import Post from './context/PostContext'

function App() {
  const { setUser } = useContext(AppContext)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [])
  return (
    <div>
      <Post>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Post>
    </div>
  )
}

export default App

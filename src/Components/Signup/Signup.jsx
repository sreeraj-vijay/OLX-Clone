import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../olx-logo.png'
import './Signup.css'
import { useState, useContext } from 'react'
import { FirebaseContext } from '../../context/firebasecontext'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase/Config'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, {
        displayName: name,
      })

      await setDoc(doc(db, 'users', result.user.uid), {
        userName: name,
        phone: mobile,
      })
      navigate('/login')
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a onClick={()=>navigate('/signin')}>Login</a>
      </div>
    </div>
  )
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { app } from './firebase/Config'
import Context, { FirebaseContext } from './context/firebasecontext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseContext.Provider value={{ app }}>
    <Context>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context>
  </FirebaseContext.Provider>
)

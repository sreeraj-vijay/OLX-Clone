import { createContext } from 'react'
import { useState } from 'react'
export const FirebaseContext = createContext(null)

export const AppContext = createContext(null)

export default function Context({ children }) {
  const [user, setUser] = useState(null)

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

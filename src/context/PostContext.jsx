import { createContext, useState } from 'react'

export const PostContext = createContext(null)

const Post = ({ children }) => {
  const [details, setDetails] = useState([])
  return (
    <PostContext.Provider value={{ details, setDetails }}>
      {children}
    </PostContext.Provider>
  )
}

export default Post

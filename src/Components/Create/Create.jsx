import React, { Fragment, useContext } from 'react'
import './Create.css'
import Header from '../Header/Header'
import { useState } from 'react'
import { FirebaseContext, AppContext } from '../../context/firebasecontext'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage, auth, db } from '../../firebase/Config'
import { addDoc, collection } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const { app } = useContext(FirebaseContext)
  const { user } = useContext(AppContext)
    const [showUpload, setShowUpload] = useState({
      show: false,
      message: 'Uploading',
      error: false,
    })
     const [showStatus, setShowStatus] = useState({
      status:false,
      message:''
     })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const storageRef = ref(storage, `/image/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
         setShowUpload({
           ...showUpload,
           message: 'Uploading Image ' + Math.floor(progress) + '% ',
           show: true,
         })
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        console.warn(error)
        setShowUpload({
          ...showUpload,
          error: true,
          message: 'Faild to upload image',
          show: true,
        })
        setShowStatus({
          show:true,
          message:error.message
        })
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onAuthStateChanged(auth, async (user) => {
            await addDoc(collection(db, 'products'), {
              name: name.trim(),
              category: category.trim(),
              price: price.trim(),
              img: downloadURL,
              uid: user.uid,
              date: new Date().toDateString(),
            })
              setShowStatus({
                message: 'Upload completed',
                error: false,
                show: true,
              })
              setShowUpload({
                show: false,
              })
            navigate('/')
          })
        })
      }
    )
  }
  return (
    <Fragment>
      <Header />
      <div>{showStatus.message}</div>
      <div className="centerDiv">
        <label htmlFor="fname">Name</label>
        <br />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          type="text"
          id="fname"
          name="Name"
        />
        <br />
        <label htmlFor="fname">Category</label>
        <br />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
          type="text"
          id="fname"
          name="category"
        />
        <br />
        <label htmlFor="fname">Price</label>
        <br />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input"
          type="number"
          id="fname"
          name="Price"
        />
        <br />

        <br />
        <img
          alt="Posts"
          width="200px"
          height="200px"
          src={image && URL.createObjectURL(image)}
        ></img>

        <form onSubmit={(e) => handleSubmit(e)}>
          <br />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            className="input"
          />
          <br />
          <button className="uploadBtn">upload and Submit</button>
        </form>
      </div>
    </Fragment>
  )
}

export default Create

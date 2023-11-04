import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../context/PostContext'
import './View.css'
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase/Config'

function View() {
//   const initialUserDetails =
//     JSON.parse(localStorage.getItem('userDetails')) || null

//   const [userDetails, setUserDetails] = useState(initialUserDetails)
//   let { details } = useContext(PostContext)
//  console.log(details);
//   if (details) {
//     localStorage.setItem('productData', JSON.stringify(details))
//   }
//   const productData = localStorage.getItem('productData')
//   if (productData) {
//     details = JSON.parse(productData)
//   }
 const [userDetails, setUserDetails] = useState(null)
 let { details } = useContext(PostContext)
 console.log(details)

 useEffect(() => {
   const fetchData = async () => {
     try {
       const { uid } = details
       console.log('UID:', uid) 
       const docRef = doc(db, 'users', uid)
       const docSnap = await getDoc(docRef)
        console.log('Fetched Data:', docSnap.data())
       const userData = docSnap.data()

       setUserDetails(userData)
     } catch (error) {
       console.error(error.message)
     }
   }

   if (details) {
     fetchData()
   }
 }, [details])

  // useEffect(() => {
  //   const inner = async () => {
  //     try {
  //       const {uid}=details
  //       const docRef = doc(db, 'users', uid)
  //       const docSnap = await getDoc(docRef)

  //       setUserDetails(docSnap.data())
  //       localStorage.setItem('userDetails', JSON.stringify(docSnap.data()))
  //     } catch (error) {
  //       console.error(error.message)
  //     }
  //   }
    
  //   inner()
  // }, [])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={details?.img} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {details?.price} </p>
          <span>{details?.name}</span>
          <p>{details?.category}</p>
          <span>{details?.date}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {userDetails ? (
            <>
              <p>{userDetails?.userName}</p>
              <p>{userDetails?.phone}</p>
            </>
          ) : (
            <>
              <p>Loading...</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default View

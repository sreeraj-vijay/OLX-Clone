import React, { useContext, useState, useEffect } from 'react'
import { db } from '../../firebase/Config'
import { collection, getDocs } from 'firebase/firestore'
import Heart from '../../assets/Heart'
import './Post.css'
import { PostContext } from '../../context/PostContext'
import { useNavigate } from 'react-router-dom'

function Posts() {
  const [products, setProducts] = useState([])
  const {setDetails} =useContext(PostContext)
  const navigate =useNavigate()
  useEffect(() => {
    const inner = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'))
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        })
        setProducts(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    inner()
  }, [])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div className="card" onClick={()=>{
                setDetails(product)
                navigate('/view')
              }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.img} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.date}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Posts

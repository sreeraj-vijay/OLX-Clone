import React from 'react'
import { useContext } from 'react'
import './Header.css'
import OlxLogo from '../../assets/OlxLogo'
import Search from '../../assets/Search'
import Arrow from '../../assets/Arrow'
import SellButton from '../../assets/SellButton'
import SellButtonPlus from '../../assets/SellButtonPlus'
import { AppContext } from '../../context/firebasecontext'
import { auth } from '../../firebase/Config'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const { user } = useContext(AppContext)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={()=>navigate('/')} className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div onClick={()=>navigate('/signin')} className="loginPage">
          <span>{user ? user.displayName : 'Login'}</span>
          <hr />
        </div>
        {user && (
          <span
            onClick={() => {
              auth.signOut()
              navigate('/signin')
            }}
          >
            Logout
          </span>
        )}
        <div className="sellMenu" onClick={()=>{navigate('/create')}}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

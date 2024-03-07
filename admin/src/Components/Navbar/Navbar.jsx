import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
const Navbar = () => {
  return (
    <div className='navabar'>
      <img src={logo} alt="" className='nav-logo'/>
      {/* <img src={navProfile} alt="" className='nav-logo'/> */}
      <h1>ShopBuster</h1>
    </div>
  )
}

export default Navbar

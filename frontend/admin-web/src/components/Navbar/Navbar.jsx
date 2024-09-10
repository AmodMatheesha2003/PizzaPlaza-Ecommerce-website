import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <img src={assets.pizzaplazalogo} alt="" className="logo" />
        <img src={assets.profile} alt="" className="profile" />
      </div>
    </div>
  )
}

export default Navbar

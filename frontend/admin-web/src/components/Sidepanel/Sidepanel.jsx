import React from 'react'
import './Sidepanel.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidepanel = () => {
  return (
    <div className='sidepanel'>
      <div className="side-options">
        
        <NavLink to='/list' className="side-option">
            <img src={assets.list} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="side-option">
            <img src={assets.iconorder} alt="" />
            <p>Orders</p>
        </NavLink>
        
        <NavLink to='/add' className="side-option">
            <img src={assets.iconadd} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/allorders' className="side-option">
            <img src={assets.logistics} alt="" />
            <p>All Orders</p>
        </NavLink>
        <NavLink to='/userlist' className="side-option">
            <img src={assets.users} alt="" />
            <p>User List</p>
        </NavLink>
        <NavLink to='/user/cart' className="side-option">
            <img src={assets.allcart} alt="" />
            <p>User Cart</p>
        </NavLink>
        
      </div>
    </div>
  )
}

export default Sidepanel

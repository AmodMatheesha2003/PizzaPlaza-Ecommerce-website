import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
            <img src={assets.logo} alt="" />
            <p>Welcome to PizzaPlaza, your go-to destination for delicious, hot, and fresh pizzas delivered right to your doorstep. We take pride in using the finest ingredients to craft pizzas that satisfy your cravings.</p>
            <div className='footer-social-media'>
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className='footer-content-center'>
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className='footer-content-right'>
            <h2>Contact Us</h2>
            <ul>
            <li>+94 786466778</li>
                <li>pizzaplaza@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr></hr>
      <p className="footer-copyright">Copyright 2024 &copy; pizzaplaza.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer

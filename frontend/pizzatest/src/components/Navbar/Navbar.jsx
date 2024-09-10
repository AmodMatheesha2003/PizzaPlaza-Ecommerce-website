import React, {useContext, useState,useEffect} from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

const Navbar = ({ setShowLogin, token, setToken, userID }) => {
    const [menu,setmenu] = useState("home");
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
      const fetchCartData = () => {
          if (token && userID) {
              fetch(`http://localhost:2025/cart/${userID}`)
              // fetch(`http://localhost:8082/cart/${userID}`)
                  .then((response) => response.json())
                  .then((carts) => {
                      const itemCount = carts.reduce((total, cart) => total + cart[1], 0);
                      setCartCount(itemCount);
                  })
                  .catch((error) => {
                      console.error("Error fetching cart data:", error);
                  });
          }
      };
      fetchCartData();
      const intervalId = setInterval(fetchCartData, 5000);
      return () => clearInterval(intervalId);
  }, [token, userID]);

  return ( 
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt='' className='logo'></img></Link>
      <ul className='navbar-menu'> 
        <Link to='/' onClick={()=> setmenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=> setmenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#recommend'  onClick={()=> setmenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Recommend</a>
        <a href='#footer'  onClick={()=> setmenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
        
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt=''></img>
        <div className='navbar-search-icon'>
        {token ? (
                <Link to='/cart' state={{ uID: userID }}>
                    <img src={assets.basket_icon} alt='Basket Icon' />
                </Link>
            ) : (
                <img src={assets.basket_icon} alt='Basket Icon' />
            )}
            {cartCount > 0 && <div className="dot"></div>}
        </div>
        {!token? 
            <button onClick={()=>setShowLogin(true)}>Sign In</button>
            : <div className='navbarprofile'>
                <img src={assets.profile_icon} alt="" className='profile'/>
                <ul className="profile-dropdown">

                  <Link to='/myOrder' state={{ userID: userID }}>
                    <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                  </Link>
                  
                  <Link to='/'>
                    <li onClick={()=>{setToken(false); setCartCount(0);}}>
                      <img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
                  </Link>
                  
                </ul>
                <hr/>
              </div>
             
        }
      </div>
    </div>
  )
}

export default Navbar

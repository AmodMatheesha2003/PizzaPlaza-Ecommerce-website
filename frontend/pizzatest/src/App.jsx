import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrder from './pages/MyOrder/MyOrder'
import Footer from './components/Footer/Footer'
import Login from './components/LoginPopUp/Login'
import StoreContextProvider from './context/StoreContext';

const App = () => {
  const [showLogin,setShowLogin] = useState(false);
  const [token,setToken] = useState(false);
  const [userID, setUserID] = useState('');
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} setToken={setToken} setUserID={setUserID} /> : <></>}

      <StoreContextProvider userID={userID}>
      <div className='app'>
      <Navbar setShowLogin={setShowLogin} token={token} setToken={setToken} userID={userID} />
      
      <Routes>
        <Route path='/' element={<Home />}/> 
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/myOrder' element={<MyOrder/>}/>
      </Routes>
      </div>
      <Footer/>
      </StoreContextProvider>
    </>
    
  )
}

export default App

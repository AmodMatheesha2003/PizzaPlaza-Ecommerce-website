import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidepanel from './components/Sidepanel/Sidepanel'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Orders/Order'
import UserList from './pages/UserList/UserList'
import CartUser from './pages/CartUser/CartUser'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import AllOrders from './pages/AllOrders/AllOrders'


function App() {
  const [showLogin,setShowLogin] = useState(true);
  return (
    <>
      {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
      <Navbar />
      <hr/>
      <div className='app-content'>
        <Sidepanel/>
        <Routes>
          <Route path='/add' element={<Add/>}/>
          <Route path='/list' element={<List/>}/>
          <Route path='/orders' element={<Order/>}/>   
          {/* home */}
          <Route path='/userlist' element={<UserList/>}/>
          <Route path='/user/cart' element={<CartUser/>}/> 
          <Route path='/allorders' element={<AllOrders/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App

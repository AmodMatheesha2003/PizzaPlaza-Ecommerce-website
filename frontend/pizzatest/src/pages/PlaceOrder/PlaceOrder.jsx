import React, { useState, useEffect } from 'react';
import './PlaceOrder.css'

import { useLocation,useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const { cart, totalPrice, deliveryFee, grandTotal,uID } = location.state || {};
  const [details, setDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    province: 'Southern',
    houseNo: '',
    zipCode: '',
    mobile: ''
  });

  useEffect(() => {
    if (uID) {
      fetch(`http://localhost:2025/user/${uID}`) 
      // fetch(`http://localhost:8080/user/${uID}`) 
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched cart data:", data);
          setDetails(prevDetails => ({
            ...prevDetails,
            ...data,
            province: data.province || 'Southern'
          }));
        })
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, [uID]);

   console.log(cart);
  // console.log(cart[0]);
  // console.log('mid '+cart[0][0]);
  // console.log('quantity '+cart[0][1]);
  // console.log('id '+cart[0][2]);
  // console.log('uid '+cart[0][3]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formaddress = `Name: ${details.name}, Email: ${details.email}, House No: ${details.houseNo}, Address: ${details.address}, City: ${details.city}, Province: ${details.province}, Zip Code: ${details.zipCode}, Mobile: ${details.mobile}`;
    
    let orderDetailsArray = [];
    let fullTotal = 0;
    let orderIds = [];
  
    const orderPromises = cart.map(async (item) => {
      const itemTotal = (item.price * item[1]) + 100;
      const orderDetails = `${item.name} x ${item[1]}`;
      orderDetailsArray.push(orderDetails);
      fullTotal += itemTotal;
      
      const orderData = new URLSearchParams({
        uid: item[3],
        mid: item[0],
        quantity: item[1],
        total: itemTotal,
        address: formaddress,
        ostatus: 'Pending',
        order_details: orderDetails
      }).toString();
  
      try {
        const response = await fetch('http://localhost:8083/order/add', {
          // const response = await fetch('http://localhost:2025/order/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: orderData,
        });
        const data = await response.json();
        console.log("Order successfully placed:", data);
        orderIds.push(data.oid);
  
        await fetch(`http://localhost:8082/cart/${item[2]}`, {
          // await fetch(`http://localhost:2025/cart/${item[2]}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Error placing order:', error);
      }
    });
  
    await Promise.all(orderPromises);
  
    const emailData = {
      toEmail: details.email,
      subject: 'Pizza Plaza Order Confirmation',
      body: `Dear ${details.name},\n\nThank you for placing an order with Pizza Plaza! Your order is currently pending and will be processed shortly. Here are your order details:\n\nOrder Details:\n${orderDetailsArray.join('\n')}\n\nOrder ID: ${orderIds.join(', ')}\nTotal Amount: Rs ${fullTotal}\nCurrent Status: Pending\n\nWe will notify you once your order moves to the next stage.\n\nThank you for choosing Pizza Plaza!\n\nBest regards,\nThe Pizza Plaza Team`
      };
    
    fetch('http://localhost:8084/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })
    .then(response => {
      if (response.ok) {
        console.log('Email sent successfully!');
      } else {
        console.error('Failed to send email');
      }
    })
    .catch(error => console.error('Error sending email:', error));
  
    navigate('/myOrder', { state: { userID: uID } });
  };
  

  return (
    <form className='palceorder' onSubmit={handleSubmit}>
      <div className="placeorder-left">
        <p className='deliveryinfo'>Delivery Information</p>
        <div className="multy-fields">
          <input type='text' placeholder='Name' name='name' required value={details.name || ''} onChange={handleInputChange} />
          
        </div>

          <input type='email' placeholder='Email Address'required value={details.email || '' } readOnly />
          <input type='text' placeholder='Delivery Address' name='address' required value={details.address || ''} onChange={handleInputChange} />

        <div className="multy-fields">
          <input type='text' placeholder='City'name='city'required onChange={handleInputChange} />
          
          <select name='province' id="province" onChange={handleInputChange}  >
            <option value="Southern">Southern Province</option>
            <option value="Eastern">Eastern Province</option>
            <option value="Northern">Northern Province</option>
            <option value="Central">Central Province</option>
            <option value="Western">Western Province</option>
            <option value="North Central">North Central Province</option>
            <option value="North Western">North Western Province</option>
            <option value="Sabaragamuwa">Sabaragamuwa Province</option>
            <option value="Uva">Uva Province</option>
          </select>
        </div>
        <div className="multy-fields">
          <input type='text' placeholder='House No' name='houseNo' required onChange={handleInputChange} />
          <input type='text' placeholder='Zip Code' name='zipCode' required onChange={handleInputChange} />
        </div>
        <input type='text' placeholder='Mobile No'name='mobile' required value={details.mobile || ''} onChange={handleInputChange} />
      </div>


      <div className="placeorder-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detals">
              <p>Subtotal</p>
              <p>Rs {totalPrice?totalPrice:0}</p>
            </div>
            <hr/>
            <div className="cart-total-detals">
              <p>Delivery Fee</p>
              <p>Rs {deliveryFee?deliveryFee:0}</p>
            </div>
            <hr/>
            <div className="cart-total-detals">
              <b>Total</b>
              <b>Rs {grandTotal?grandTotal:0}</b>
            </div>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

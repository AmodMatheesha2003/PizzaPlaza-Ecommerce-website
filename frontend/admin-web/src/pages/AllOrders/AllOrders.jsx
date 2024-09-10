import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';

const AllOrders = () => {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        
      fetch(`http://localhost:2025/order/users`)
    //   fetch(`http://localhost:8083/order/users`)
          .then(response => response.json())
          .then(data => {
              console.log('Fetched data:', data);
              setOrder(Array.isArray(data) ? data : []);
          })
          .catch(error => console.error('Error fetching orders:', error));
        
    }, []);

  return (
      <div className="user-order">
          <h2>User Order</h2>
          <div className="container">
              {order.length > 0 ? (
                  order.map((orderItem) => (
                      <div key={orderItem.oid} className="order-item">
                          <img src={assets.parcel_icon} alt="" />
                          <p>OID {orderItem.oid}</p>
                          <p>{orderItem.order_details}</p>
                          <p>Rs {orderItem.total.toFixed(2)}</p>
                          <p className="long-text">{orderItem.address}</p>
                          <p>{new Date(orderItem.order_date).toLocaleDateString()}</p>
                          <p>{orderItem.order_time}</p>
                          <p>{orderItem.ostatus}</p>
                      </div>
                  ))
              ) : (
                  <p>No orders found.</p>
              )}
          </div>
      </div>
  );
}

export default AllOrders;

import React, { useEffect, useState } from 'react';
import './MyOrder.css';
import { useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';

const MyOrder = () => {
    const location = useLocation();
    const { userID } = location.state || {};

    const [order, setOrder] = useState([]);

    const handleStatusChange = (oid) => {
        fetch(`http://localhost:8083/order/update/${oid}?ostatus=Delivered`, {
            // fetch(`http://localhost:2025/order/update/${oid}?ostatus=Delivered`, {
            method: 'PUT',
        })
        .then(response => {
            if (response.ok) {
                console.log("update successfully")
            }else{
                console.log("Error updating order status")
            }
        })
        .catch(error => console.error('Error updating order status:', error));
    };

    useEffect(() => {
        if (userID) {
            fetch(`http://localhost:2025/order/user/${userID}`)
            // fetch(`http://localhost:8083/order/user/${userID}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched data:', data);
                    setOrder(Array.isArray(data) ? data : []);
                })
                .catch(error => console.error('Error fetching orders:', error));
        }
    }, [userID]);

    return (
        <div className="my-order">
            <h2>My Order</h2>
            <div className="container">
                {order.length > 0 ? (
                    order.map((orderItem) => (
                        <div key={orderItem.oid} className="order-item">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{orderItem.order_details}</p>
                            <p>Rs {orderItem.total.toFixed(2)}</p>
                            <p>{orderItem.address}</p>
                            <p>{new Date(orderItem.order_date).toLocaleDateString()}</p>
                            <p>{orderItem.order_time}</p>
                            <p><span>&#x25cf; </span><b>{orderItem.ostatus}</b></p>
                            <button disabled={orderItem.ostatus === 'Delivered'} onClick={(e) => handleStatusChange(orderItem.oid)}>{orderItem.ostatus === 'Delivered' ? 'Feedback' : 'Confirm Order'}</button>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default MyOrder;

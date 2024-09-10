import React, { useState, useEffect } from 'react';
import './Order.css';
import { assets } from '../../assets/assets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = () => {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        
      fetch(`http://localhost:2025/order/progress`)
    //   fetch(`http://localhost:8083/order/users`)
          .then(response => response.json())
          .then(data => {
              console.log('Fetched data:', data);
              setOrder(Array.isArray(data) ? data : []);
          })
          .catch(error => console.error('Error fetching orders:', error));
        
    }, []);

    const extractEmail = (address) => {
        const emailMatch = address.match(/Email:\s*([^\s,]+)/);
        return emailMatch ? emailMatch[1] : 'No Email Found';
    };

    const extractName = (address) => {
        const nameMatch = address.match(/Name:\s*([^,]+)/);
        return nameMatch ? nameMatch[1] : 'No Name Found';
    };


  const handleStatusChange = (oid, newStatus, address, order_details, total) => {
    fetch(`http://localhost:8083/order/update/${oid}?ostatus=${newStatus}`, {
        method: 'PUT',
    })
    .then(response => {
        if (response.ok) {
            setOrder(prevOrders =>
                prevOrders.map(orderItem =>
                    orderItem.oid === oid ? { ...orderItem, ostatus: newStatus } : orderItem
                )
            );
            console.log('Order status successfully updated!');
            toast.success('Order status successfully updated!')

            const email = extractEmail(address);
            //console.log(email);

            const name = extractName(address);
            //console.log(name);
            
            const sendEmail = (emailData) => {
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
            };  

            if (newStatus === 'Preparing') {
                console.log('Preparing');
                const emailData = {
                    toEmail: email,
                    subject: 'Pizza Plaza Order Update - Preparing',
                    body: `Dear ${name},\n\nGreat news! Your order is now being prepared. Here's what you can expect:\n\nOrder Details:\n${order_details}\n\nOrder ID: ${oid}\nTotal Amount: Rs ${total}\nCurrent Status: Preparing\n\nOur team is working hard to get your delicious pizza ready. We will notify you once it is out for delivery!\n\nThank you for choosing Pizza Plaza!\n\nBest regards,\nThe Pizza Plaza Team`
                };
                sendEmail(emailData);
            
            } else if (newStatus === 'Out for Delivery') {
                console.log('Out for Delivery');
                const emailData = {
                    toEmail: email,
                    subject: 'Pizza Plaza Order Update - Out for Delivery',
                    body: `Dear ${name},\n\nYour order is on its way! Get ready to enjoy your pizza soon.\n\nOrder Details:\n${order_details}\n\nOrder ID: ${oid}\nTotal Amount: Rs ${total}\nCurrent Status: Out for Delivery\n\nOur delivery team is heading your way, and your pizza will arrive shortly.\n\nThank you for choosing Pizza Plaza!\n\nBest regards,\nThe Pizza Plaza Team`
                };
                sendEmail(emailData);
            
            } else if (newStatus === 'Delivered') {
                console.log('Delivered');
                const emailData = {
                    toEmail: email,
                    subject: 'Pizza Plaza Order Update - Delivered',
                    body: `Dear ${name},\n\nWe hope you're enjoying your pizza! Your order has been delivered successfully.\n\nOrder Details:\n${order_details}\n\nOrder ID: ${oid}\nTotal Amount: Rs ${total}\nCurrent Status: Delivered\n\nWe appreciate your business and hope to serve you again soon!\n\nThank you for choosing Pizza Plaza!\n\nBest regards,\nThe Pizza Plaza Team`
                };
                sendEmail(emailData);
            
            } else if (newStatus === 'Failed Delivery') {
                console.log('Failed Delivery');
                const emailData = {
                    toEmail: email,
                    subject: 'Pizza Plaza Order Update - Failed Delivery',
                    body: `Dear ${name},\n\nWe regret to inform you that we were unable to deliver your order.\n\nOrder Details:\n${order_details}\n\nOrder ID: ${oid}\nTotal Amount: Rs ${total}\nCurrent Status: Failed Delivery\n\nPlease contact us at your earliest convenience to resolve the issue.\n\nWe apologize for the inconvenience and thank you for your understanding.\n\nBest regards,\nThe Pizza Plaza Team`
                };
                sendEmail(emailData);
            }
            
        } else {
            console.error('Failed to update order status');
            toast.error('Failed to update order status')
        }
    })
    .catch(error => console.error('Error updating order status:', error));

  };

  return (
      <div className="user-order">
        <ToastContainer/>
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

                          <select value={orderItem.ostatus} onChange={(e) => handleStatusChange(orderItem.oid, e.target.value, orderItem.address, orderItem.order_details, orderItem.total)} >
                                <option value="Pending" >Pending</option>
                                <option value="Preparing">Preparing</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Failed Delivery">Failed Delivery</option>
                          </select>
                      </div>
                  ))
              ) : (
                  <p>No orders found.</p>
              )}
          </div>
      </div>
  );
}

export default Order;

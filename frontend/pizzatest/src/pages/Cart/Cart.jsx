import React, { useEffect, useState } from 'react';
import './Cart.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const uID = location.state?.uID;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (uID) {
      fetch(`http://localhost:2025/cart/${uID}`)
      // fetch(`http://localhost:8082/cart/${uID}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            Promise.all(
              data.map(cartItem =>
                fetch(`http://localhost:2025/menu/items/${cartItem[0]}`)
                // fetch(`http://localhost:8081/menu/items/${cartItem[0]}`)
                  .then(response => response.json())
                  .then(menuData => ({
                    ...cartItem,
                    price: menuData.price,
                    image: menuData.image,
                    name: menuData.name
                  }))
              )
            ).then(updatedCart => setCart(updatedCart))
            .catch(error => console.error("Error fetching menu items:", error));
          } else {
            setCart([]);
          }
        })
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, [uID]);

  const removeItemCart = (id) => {
    fetch(`http://localhost:8082/cart/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setCart(prevCart => prevCart.filter(cartItem => cartItem[2] !== id));
        toast.success('Cart removed successfully');
      } else {
        toast.error('Failed to remove item');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, cartItem) => {
      const itemTotalPrice = cartItem.price ? cartItem[1] * cartItem.price : 0;
      return total + itemTotalPrice;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();
  const deliveryFee = totalPrice === 0 ? 0 : (cart.length) * 100;
  const grandTotal = totalPrice + deliveryFee;

  const handleCheckout = () => {
    navigate('/order', {
      state: {
        cart,
        totalPrice,
        deliveryFee,
        grandTotal,
        uID
      }
    });
  };

  return (
    <div className='cart'>
      <ToastContainer />
      <div className='cart-items'>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cart.map((cartItem) => {
          const totalPrice = cartItem.price ? cartItem[1] * cartItem.price : 0;

          return (
            <div key={cartItem[2]}>
              <div className="cart-items-title cart-items-item">
                <img src={cartItem.image ? `data:image/jpeg;base64,${cartItem.image}` : ""} alt={cartItem.name || "Loading..."} />
                <p>{cartItem.name || cartItem[0] + " (Name is Loading...)"}</p>
                <p>{cartItem.price ? `Rs.${cartItem.price.toFixed(2)}` : "Loading..."}</p>
                <p>{cartItem[1] ? cartItem[1] : 0}</p>
                <p>{totalPrice ? `Rs.${totalPrice.toFixed(2)}` : "Loading..."}</p>
                <p onClick={() => removeItemCart(cartItem[2])} className='cross'>x</p>
              </div>
              <hr />
            </div>
          );
        })}
      </div> 

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detals">
              <p>Subtotal</p>
              <p>Rs {totalPrice.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-detals">
              <p>Delivery Fee</p>
              <p>Rs {deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-detals">
              <b>Total</b>
              <b>Rs {grandTotal.toFixed(2)}</b>
            </div>
          </div>
          <button disabled={grandTotal === 0} onClick={handleCheckout}>Proceed to checkout</button>
        </div>
        <div className='cart-image'>
        </div>
      </div>
    </div>
  );
}

export default Cart;

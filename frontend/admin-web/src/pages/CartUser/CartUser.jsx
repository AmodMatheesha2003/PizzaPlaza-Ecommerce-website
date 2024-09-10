import React, { useEffect, useState } from "react";

const CartUser = () => {
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState({});

  useEffect(() => {
    fetch("http://localhost:2025/cart/all")
    // fetch("http://localhost:8082/cart/all")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched cart data:", data);
        setCart(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching cart:", error));
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      cart.forEach((cartItem) => {
        fetch(`http://localhost:2025/menu/items/${cartItem.mid}`)
        // fetch(`http://localhost:8081/menu/items/${cartItem.mid}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(`Fetched menu data mid ${cartItem.mid}:`, data);
            setMenuItems((prevMenuItems) => ({
              ...prevMenuItems,
              [cartItem.mid]: data,
            }));
          })
          .catch((error) =>
            console.error(`Error fetching menu mid ${cartItem.mid}:`, error)
          );
      });
    }
  }, [cart]);

  return (
    <div className="list add flex-colm">
      <h2 className="list-topic">User Cart List</h2>
      <div className="list-tabel">
        <div className="list-tabel-format tittle">
          <b>User Id</b>
          <b>Product Name</b>
          <b>Product Image</b>
          <b>Price</b>
          <b>Quantity</b>
          <b>Total</b>
        </div>
        {cart.map((cartItem) => {
          const menuItem = menuItems[cartItem.mid] || {};
          const totalPrice = menuItem.price ? cartItem.quantity * menuItem.price : 0;

          return (
            <div key={cartItem.id} className="list-tabel-format">
              <p>{cartItem.uid}</p>
              <p>{menuItem.name || cartItem.id+" ( Name is Loading...)"}</p>
              <p>
                    <img src={menuItem.image ? `data:image/jpeg;base64,${menuItem.image}` : ""}
                    alt={menuItem.name || "Loading..."}
                    style={{ width: "50px", height: "50px" }}/>
              </p>
              <p>{menuItem.price ? `Rs.${menuItem.price}` : "Loading..."}</p>
              <p>{cartItem.quantity}</p>
              <p>{totalPrice ? `Rs.${totalPrice.toFixed(2)}` : "Loading..."}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartUser;

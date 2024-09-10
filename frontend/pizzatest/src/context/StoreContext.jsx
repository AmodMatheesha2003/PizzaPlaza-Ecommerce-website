import React,{ createContext, useState} from "react";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
    const { userID } = props;

    const[cartItems,setCartItems] = useState({});

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const currentQuantity = prev[itemId] || 0;
            const newQuantity = currentQuantity + 1;
            const updatedCart = { ...prev, [itemId]: newQuantity };
    
            const method = currentQuantity === 0 ? 'POST' : 'PUT';
            const url = currentQuantity === 0 
                ? 'http://localhost:8082/cart/add' 
                : `http://localhost:8082/cart/user/${userID}/item/${itemId}`;

    
            fetch(url, {
                method,
                headers: {
                    'Content-Type': method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json',
                },

                body: method === 'POST' 
                    ? new URLSearchParams({
                        uid: userID,
                        mid: itemId,
                        quantity: newQuantity
                    })
                    
                    : JSON.stringify({
                        quantity: newQuantity
                    }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(`Successfully ${method === 'POST' ? 'added to' : 'updated in'} cart `, data);
            })
            .catch(error => {
                console.error(`Error ${method === 'POST' ? 'adding to' : 'updating in'} cart -`, error);
            });
    
            return updatedCart;
        });
    };
    
    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const currentQuantity = prev[itemId] || 0;
            if (currentQuantity <= 1) {
                const { [itemId]: _, ...remainingItems } = prev;
                console.log(`Item id ${itemId} removed from cart`);

                fetch(`http://localhost:8082/cart/user/${userID}/item/${itemId}`, {
                    method: 'DELETE',
                  })
                  .then(response => {
                    if (response.ok) {
                      console.log('Cart remove succussfully');
                    } else {
                      console.error('Failed to remove');
                    }
                  })
                  .catch(error => console.error('Error:', error));

                return remainingItems;
            } else {
                const updatedCart = { ...prev, [itemId]: currentQuantity - 1 };
                console.log(`Item ID  ${itemId}, Quantity  ${updatedCart[itemId]}`);

                fetch(`http://localhost:8082/cart/user/${userID}/item/${itemId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        quantity: updatedCart[itemId]
                    }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Successfully updated cart ', data);
                })
                .catch(error => {
                    console.error('Error updating cart ', error);
                });

                return updatedCart;
            }
        });
    };

    const contextValue ={
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart
    }

    return(
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}

export default StoreContextProvider;
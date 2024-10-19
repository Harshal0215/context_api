import React, { createContext, useState, useEffect, useContext } from 'react'

export  const CartContext = createContext()

export const CartProvider = ({children})=>{
  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])


  const addToCart=(item) =>{
    const isItemInCart = cartItems.find((cartItem)=> cartItem.id ===item.id);

    if(isItemInCart){
      setCartItems(
        cartItems.map((cartItem)=> cartItem.id ===item.id ? {...cartItem,quantity:cartItem.quantity+1}: cartItem)
      )
    }
    else{
      setCartItems([...cartItems,{...item,quantity:1}])
    }
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
  
    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id)); // if the quantity of the item is 1, remove the item from the cart
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 } // if the quantity of the item is greater than 1, decrease the quantity of the item
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]); // set the cart items to an empty array
  };

  
const getCartTotal = () => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // calculate the total price of the items in the cart
};

useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);

useEffect(() => {
  const cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
  setCartItems(JSON.parse(cartItems));
  }
}, []);

return (
  <CartContext.Provider
    value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
    }}
  >
    {children}
  </CartContext.Provider>
)

}
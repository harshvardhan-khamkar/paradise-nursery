import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart (in rupees)
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach(item => {
      const rupeeCost = parseInt(item.cost.replace('$', '')) * 80;
      totalAmount += item.quantity * rupeeCost;
    });
    return totalAmount;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);

  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Coming Soon 🚧');
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))
    } else {
      dispatch(removeItem(item.name))
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item (in rupees)
  const calculateTotalCost = (item) => {
    const rupeeCost = parseInt(item.cost.replace('$', '')) * 80;
    return item.quantity * rupeeCost;
  };

  return (
    <div className="cart-container">
      <h2 className="cart-total-heading">Cart Total</h2>
      <div className="cart-total-amount">₹{calculateTotalAmount()}</div>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">₹{parseInt(item.cost.replace('$', '')) * 80}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ₹{calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
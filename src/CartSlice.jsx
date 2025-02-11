import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
    const {name,image,cost}=action.payload;
    const existingItem = state.items.find(item=>item.name===name);
    if (existingItem){
      existingItem.quantity++;
    }
    else {
      const numericCost = parseFloat(cost.replace('$', ''));
      state.items.push({name,image,cost:numericCost,quantity:1});
    }
    },
    removeItem: (state, action) => {
      state.items=state.items.filter(item=>item.name!==action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      state.items = state.items.map(item =>
        item.name === name ? { ...item, quantity } : item // ✅ Immutable update
      );
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

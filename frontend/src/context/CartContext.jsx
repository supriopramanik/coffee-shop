import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const add = (product, qty=1) => {
    setItems((prev)=>{
      const existing = prev.find(p=>p._id===product._id);
      if(existing){ return prev.map(p=>p._id===product._id?{...p, qty:p.qty+qty}:p); }
      return [...prev, { ...product, qty }];
    });
  };
  const remove = (id) => setItems((prev)=>prev.filter(p=>p._id!==id));
  const clear = () => setItems([]);
  const total = items.reduce((s,i)=>s+i.price*i.qty,0);
  return <CartContext.Provider value={{ items, add, remove, clear, total }}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);

import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem('drk_cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const add = (product, qty=1) => {
    setItems((prev)=>{
      const existing = prev.find(p=>p._id===product._id);
      if(existing){ return prev.map(p=>p._id===product._id?{...p, qty:p.qty+qty}:p); }
      return [...prev, { ...product, qty }];
    });
  };
  const updateQty = (id, qty) => {
    setItems((prev)=>{
      if(qty<=0) return prev.filter(p=>p._id!==id);
      return prev.map(p=>p._id===id?{...p, qty}:p);
    });
  };
  const remove = (id) => setItems((prev)=>prev.filter(p=>p._id!==id));
  const clear = () => setItems([]);
  const total = items.reduce((s,i)=>s+i.price*i.qty,0);
  useEffect(() => {
    try {
      localStorage.setItem('drk_cart', JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);
  return <CartContext.Provider value={{ items, add, updateQty, remove, clear, total }}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);

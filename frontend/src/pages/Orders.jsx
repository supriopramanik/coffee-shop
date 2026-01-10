import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Orders(){
  const { authFetch } = useAuth();
  const [orders,setOrders]=useState([]);
  useEffect(()=>{ authFetch('/api/orders/my').then(r=>r.json()).then(setOrders).catch(()=>{}); },[]);
  return (
    <div className="container">
      <h2>My Orders</h2>
      <div className="grid">
        {orders.map(o=> (
          <div className="card" key={o._id}>
            <div>Status: <strong>{o.status}</strong></div>
            <ul>
              {o.items.map((i,idx)=>{
                const img = i.imageUrl || i?.product?.imageUrl;
                return (
                  <li key={idx} style={{display:'flex',alignItems:'center',gap:12,margin:'8px 0'}}>
                    {img && (
                      <img src={img} alt={i.name} style={{width:56,height:56,objectFit:'cover',borderRadius:8}}/>
                    )}
                    <div style={{display:'flex',flexDirection:'column'}}>
                      <span>{i.name} x {i.qty}</span>
                      <span style={{opacity:.8}}>৳ {i.price*i.qty}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div>Total: <strong>৳ {o.total}</strong></div>
          </div>
        ))}
      </div>
    </div>
  );
}

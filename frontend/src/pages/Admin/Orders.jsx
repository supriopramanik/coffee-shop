import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminOrders(){
  const { authFetch } = useAuth();
  const [orders,setOrders]=useState([]);
  const load=()=> authFetch('/api/orders').then(r=>r.json()).then(setOrders);
  useEffect(()=>{ load(); },[]);
  const update=async(id,status)=>{ const r=await authFetch(`/api/orders/${id}/status`,{method:'PUT',body:JSON.stringify({status})}); if(r.ok) load(); };
  return (
    <div className="grid">
      {orders.map(o=> (
        <div className="card" key={o._id}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div>#{o._id.slice(-6)} — <strong>{o.status}</strong></div>
            <div>৳ {o.total}</div>
          </div>
          <ul>
            {o.items.map((i,idx)=>{
              const img = i.imageUrl || i?.product?.imageUrl;
              return (
                <li key={idx} style={{display:'flex',alignItems:'center',gap:10,margin:'6px 0'}}>
                  {img && <img src={img} alt={i.name} style={{width:40,height:40,objectFit:'cover',borderRadius:6}}/>}
                  <div style={{display:'flex',flexDirection:'column'}}>
                    <span>{i.name} x {i.qty}</span>
                    <span style={{opacity:.8,fontSize:12}}>৳ {i.price*i.qty}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {['Pending','Preparing','Completed','Cancelled'].map(s=> <button key={s} className="btn" onClick={()=>update(o._id,s)}>{s}</button>)}
          </div>
        </div>
      ))}
    </div>
  );
}

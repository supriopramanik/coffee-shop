import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminCustomers(){
  const { authFetch } = useAuth();
  const [users,setUsers]=useState([]);
  const [selected,setSelected]=useState(null);
  const [orders,setOrders]=useState([]);

  const loadUsers=()=> authFetch('/api/users').then(r=>r.json()).then(setUsers);
  const loadOrders=(id)=> authFetch(`/api/users/${id}/orders`).then(r=>r.json()).then(setOrders);

  useEffect(()=>{ loadUsers(); },[]);

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:16}}>
      <div className="card">
        <h3>Customers</h3>
        <ul style={{listStyle:'none',padding:0,margin:0}}>
          {users.map(u=> (
            <li key={u._id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid #eee'}}>
              <button className="btn secondary" style={{background:'#eee',color:'#333'}} onClick={()=>{setSelected(u); loadOrders(u._id);}}>{u.name || u.email}</button>
              <span>{u.email}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h3>{selected? `Orders — ${selected.email}` : 'Select a customer'}</h3>
        {selected && (
          <ul style={{listStyle:'none',padding:0}}>
            {orders.map(o=> (
              <li key={o._id} style={{borderBottom:'1px solid #eee',padding:'8px 0'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span>#{o._id.slice(-6)} — {o.status}</span>
                  <span>৳ {o.total}</span>
                </div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                  {o.items.map((i,idx)=>{
                    const img = i.imageUrl || i?.product?.imageUrl;
                    return img ? (
                      <img key={idx} src={img} alt={i.name} title={`${i.name} x ${i.qty}`} style={{width:32,height:32,objectFit:'cover',borderRadius:6}}/>
                    ) : null;
                  })}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

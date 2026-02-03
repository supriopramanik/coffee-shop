import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function AdminProducts(){
  const { authFetch } = useAuth();
  const [products,setProducts]=useState([]);
  const nav = useNavigate();

  const load=()=> authFetch('/api/products').then(r=>r.json()).then(setProducts);
  useEffect(()=>{ load(); },[]);

  const remove=async(id)=>{ if(!confirm('Delete?')) return; const r=await authFetch(`/api/products/${id}`,{method:'DELETE'}); if(r.ok) load(); };
  const startEdit=(p)=>{ nav(`/admin/products/${p._id}`); };

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h3>Products</h3>
        <button className="btn" onClick={()=>nav('/admin/products/new')}>Add Product</button>
      </div>
        <div className="grid products">
          {products.map(p=> (
            <div className="card" key={p._id}>
              <img src={p.imageUrl} alt={p.name} className="product-thumb"/>
              <div style={{fontWeight:600}}>{p.name}</div>
              <div>৳ {p.price} {p.isActive===false && <span className="badge" style={{marginLeft:6}}>Inactive</span>}</div>
              <div style={{display:'flex',gap:8,marginTop:8}}>
                <button className="btn" onClick={()=>startEdit(p)}>Edit</button>
                <button className="btn secondary" onClick={()=>remove(p._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

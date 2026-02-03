import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProductForm(){
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { authFetch } = useAuth();
  const nav = useNavigate();
  const [form,setForm]=useState({ name:'', description:'', price:'', imageUrl:'', isActive:true});
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    if(isEdit){
      setLoading(true);
      authFetch(`/api/products/${id}`).then(r=>r.json()).then(p=>{
        setForm({ name:p.name||'', description:p.description||'', price:String(p.price||''), imageUrl:p.imageUrl||'', isActive: p.isActive!==false });
      }).finally(()=>setLoading(false));
    }
  },[id,isEdit]);

  const submit=async(e)=>{
    e.preventDefault();
    const payload = { ...form, price:Number(form.price)||0 };
    const res = await authFetch(isEdit? `/api/products/${id}` : '/api/products', { method: isEdit? 'PUT':'POST', body: JSON.stringify(payload) });
    if(res.ok){ nav('/admin/products'); }
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:640,margin:'0 auto'}}>
        <h3 style={{marginTop:0}}>{isEdit? 'Update Product' : 'Add Product'}</h3>
        {loading? <div>Loading…</div> : (
          <form className="form" onSubmit={submit}>
            <div><label>Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></div>
            <div><label>Description</label><input value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required/></div>
            <div><label>Price (৳)</label><input type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required/></div>
            <div><label>Image URL</label><input value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})} required/></div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <label className="switch" aria-label="Active">
                <input id="isActive" type="checkbox" checked={form.isActive} onChange={e=>setForm({...form,isActive:e.target.checked})} />
                <span className="switch-track"></span>
                <span className="switch-label">{form.isActive ? 'Active' : 'Inactive'}</span>
              </label>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className="btn" type="submit">{isEdit? 'Update' : 'Create'}</button>
              <button type="button" className="btn secondary" onClick={()=>nav('/admin/products')}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

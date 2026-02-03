import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Profile(){
  const { user, updateProfile } = useAuth();
  const [form,setForm]=useState({ name:'', email:'', phone:'', address:'' , currentPassword:'', newPassword:''});
  const [msg,setMsg]=useState('');

  useEffect(()=>{
    if(user){ setForm({ name:user.name||'', email:user.email||'', phone:user.phone||'', address:user.address||'', currentPassword:'', newPassword:'' }); }
  },[user]);

  useEffect(()=>{
    if(!msg) return;
    const t=setTimeout(()=>setMsg(''),2000);
    return ()=>clearTimeout(t);
  },[msg]);

  const submit=async(e)=>{
    e.preventDefault();
    const payload = { name:form.name, phone:form.phone, address:form.address };
    if(form.newPassword){
      payload.currentPassword = form.currentPassword;
      payload.newPassword = form.newPassword;
    }
    try{
      await updateProfile(payload);
      setMsg('Profile updated');
    }catch(err){
      setMsg('Update failed');
    }
  };

  return (
    <div className="card" style={{maxWidth:640}}>
      <h3>My Profile</h3>
      {msg && <div className="badge" style={{marginBottom:8}}>{msg}</div>}
      <form className="form" onSubmit={submit}>
        <div><label>Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></div>
        <div><label>Email</label><input value={form.email} disabled/></div>
        <div><label>Phone</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required/></div>
        <div><label>Address</label><input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} required/></div>
        <div><label>Current Password</label><input type="password" value={form.currentPassword} onChange={e=>setForm({...form,currentPassword:e.target.value})} placeholder="Enter current password"/></div>
        <div><label>New Password</label><input type="password" value={form.newPassword} onChange={e=>setForm({...form,newPassword:e.target.value})} placeholder="Enter new password"/></div>
        <button className="btn">Save Changes</button>
      </form>
    </div>
  );
}

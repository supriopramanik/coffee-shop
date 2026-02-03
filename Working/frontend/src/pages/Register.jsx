import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [phone,setPhone]=useState('');
  const [address,setAddress]=useState('');
  const [error,setError]=useState('');
  const nav=useNavigate();
  const { register } = useAuth();

  const onSubmit=async(e)=>{
    e.preventDefault();
    try{ await register({name,email,password,phone,address}); nav('/'); }
    catch(err){ setError('Registration failed'); }
  };

  return (
    <div className="container" style={{maxWidth:420}}>
      <h2>Create Account</h2>
      {error && <div className="card" style={{background:'#ffe5e5'}}>{error}</div>}
      <form className="form" onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} required/>
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} required/>
        </div>
        <div>
          <label>Phone</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} required/>
        </div>
        <div>
          <label>Address</label>
          <input value={address} onChange={e=>setAddress(e.target.value)} required/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        </div>
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
}

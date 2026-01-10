import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const nav=useNavigate();
  const loc=useLocation();
  const { login } = useAuth();

  const onSubmit=async(e)=>{
    e.preventDefault();
    try{ await login(email,password); nav(loc.state?.from?.pathname || '/'); }
    catch(err){ setError('Invalid credentials'); }
  };

  return (
    <div className="container" style={{maxWidth:420}}>
      <h2>Login</h2>
      {error && <div className="card" style={{background:'#ffe5e5'}}>{error}</div>}
      <form className="form" onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} required/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        </div>
        <button className="btn" type="submit">Login</button>
      </form>
      <p>New here? <Link to="/register">Create account</Link></p>
    </div>
  );
}

import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar(){
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [open, setOpen] = useState(false);
  const isAdmin = !!user?.isAdmin;
  return (
    <nav className="nav">
      <div className="container row">
        <Link to={isAdmin?'/admin':'/'} className="brand" style={{display:'flex',alignItems:'center',gap:8}}>
          <img src="/logo.png" alt="Drinkin'" className="logo"/>
        </Link>
        <button className="toggle" onClick={()=>setOpen(o=>!o)} aria-label="Menu">☰</button>
        <div className={"menu" + (open?" open":"")}>
          {isAdmin ? (
            <>
              <NavLink to="/admin" end onClick={()=>setOpen(false)}>Dashboard</NavLink>
              <NavLink to="/admin/products" onClick={()=>setOpen(false)}>Products</NavLink>
              <NavLink to="/admin/products/new" onClick={()=>setOpen(false)}>Add Product</NavLink>
              <NavLink to="/admin/orders" onClick={()=>setOpen(false)}>Orders</NavLink>
              <NavLink to="/admin/customers" onClick={()=>setOpen(false)}>Customers</NavLink>
              <button className="btn secondary" onClick={()=>{logout(); setOpen(false);}}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/" end onClick={()=>setOpen(false)}>Home</NavLink>
              <NavLink to="/shop" onClick={()=>setOpen(false)}>Shop</NavLink>
              <NavLink to="/about" onClick={()=>setOpen(false)}>About</NavLink>
              <NavLink to="/cart" onClick={()=>setOpen(false)}>Cart({items.length})</NavLink>
              {user ? (
                <>
                  <NavLink to="/dashboard" onClick={()=>setOpen(false)}>My Dashboard</NavLink>
                  <button className="btn secondary" onClick={()=>{logout(); setOpen(false);}} style={{marginLeft:8}}>Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/login" onClick={()=>setOpen(false)}>Login</NavLink>
                  <NavLink to="/register" onClick={()=>setOpen(false)}>Register</NavLink>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

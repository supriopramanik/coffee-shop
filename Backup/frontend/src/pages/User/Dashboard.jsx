import { NavLink, Outlet } from 'react-router-dom';

export default function UserDashboardLayout(){
  return (
    <div className="container">
      <h2 style={{marginTop:0}}>My Dashboard</h2>
      <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
        <NavLink to="/dashboard" end className="btn">My Orders</NavLink>
        <NavLink to="/dashboard/profile" className="btn secondary">My Profile</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

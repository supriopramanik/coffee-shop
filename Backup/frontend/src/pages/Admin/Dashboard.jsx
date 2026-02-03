import { Outlet } from 'react-router-dom';

export default function AdminDashboard(){
  return (
    <div className="container">
      <h2>Admin Panel</h2>
      {/* Admin navigation moved to top Navbar to avoid duplication */}
      <Outlet />
    </div>
  );
}

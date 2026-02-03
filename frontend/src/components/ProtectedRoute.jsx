import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children, adminOnly=false }){
  const { user } = useAuth();
  const loc = useLocation();
  if(!user) return <Navigate to="/login" state={{ from: loc }} replace />;
  if(adminOnly && !user.isAdmin) return <Navigate to="/" replace/>;
  return children;
}

import { useAuth } from './AuthContext';
import Login from '../pages/Login';

export default function ProtectedRoute({ children }) {
  const { autenticado } = useAuth();

  if (!autenticado) {
    return <Login />;
  }

  return children;
}
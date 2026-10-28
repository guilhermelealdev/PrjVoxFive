import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav style={{ display: 'flex', gap: 20, padding: '16px 32px', background: '#142C14', color: '#fff', alignItems: 'center' }}>
        <strong style={{ fontSize: 18, color: '#E4EB9C' }}>VoxSeven</strong>
        <Link to="/ocorrencias" style={{ color: '#fff', textDecoration: 'none' }}>Feedbacks</Link>
        <Link to="/ocorrencias/nova" style={{ color: '#fff', textDecoration: 'none' }}>Novo Feedback</Link>
        
        {usuario.role === 'ADMIN' && (
          <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Dashboard Admin</Link>
        )}
        
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 13 }}>{usuario.username} ({usuario.role})</span>
          <button onClick={handleLogout} style={{ background: '#7A2E2E', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Sair</button>
        </div>
      </nav>
      <main style={{ padding: 32 }}>
        <Outlet />
      </main>
    </div>
  );
}
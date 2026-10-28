import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Layout() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarAberta, setSidebarAberta] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const menuItemStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    borderRadius: 8,
    textDecoration: 'none',
    color: isActive(path) ? '#fff' : '#667085',
    background: isActive(path) ? '#2D5128' : 'transparent',
    fontWeight: 600,
    fontSize: 14,
    transition: 'all 0.2s',
    marginBottom: 4
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F8FAF9' }}>
      
      <header style={{ height: 64, background: '#FFFFFF', borderBottom: '1px solid #E1E8E0', display: 'flex', alignItems: 'center', padding: '0 24px', zIndex: 10 }}>
        <button 
          onClick={() => setSidebarAberta(!sidebarAberta)}
          style={{ background: 'transparent', border: 'none', color: '#142C14', cursor: 'pointer', display: 'flex', alignItems: 'center', marginRight: 20 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <strong style={{ fontSize: 20, color: '#142C14', letterSpacing: '-0.5px' }}>VoxSeven</strong>
        
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#142C14' }}>{usuario.username}</span>
            <span style={{ fontSize: 11, color: '#667085', fontWeight: 600, letterSpacing: 0.5 }}>{usuario.role}</span>
          </div>
          <button onClick={handleLogout} style={{ background: 'transparent', color: '#A02020', padding: '8px 12px', border: '1px solid #A02020', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
            SAIR
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ 
          width: sidebarAberta ? 240 : 0, 
          background: '#FFFFFF', 
          borderRight: sidebarAberta ? '1px solid #E1E8E0' : 'none',
          overflow: 'hidden',
          transition: 'width 0.3s ease',
        }}>
          <nav style={{ padding: '24px 12px', display: 'flex', flexDirection: 'column', width: 240 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, paddingLeft: 20 }}>Menu Principal</span>
            
            <Link to="/ocorrencias" style={menuItemStyle('/ocorrencias')}>
              Meus Feedbacks
            </Link>
            <Link to="/ocorrencias/nova" style={menuItemStyle('/ocorrencias/nova')}>
              Novo Feedback
            </Link>
            
            {usuario.role === 'ADMIN' && (
              <>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: 1, marginTop: 24, marginBottom: 12, paddingLeft: 20 }}>Administração</span>
                <Link to="/dashboard" style={menuItemStyle('/dashboard')}>
                  Dashboard
                </Link>
                <Link to="/consultas" style={menuItemStyle('/consultas')}>
                  Consultas Avançadas
                </Link>
              </>
            )}
          </nav>
        </aside>

        <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
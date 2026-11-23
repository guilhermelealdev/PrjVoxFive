import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import logo from '../assets/logo.png';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (carregando) return;
    
    setErro('');
    setCarregando(true);
    
    try {
      await login(username, senha);
      navigate('/ocorrencias');
    } catch (error) {
      if (error.response?.status === 401) setErro('Usuário ou senha inválidos.');
      else if (error.response?.status === 429) setErro('Muitas tentativas. Aguarde um minuto.');
      else setErro('Erro ao conectar com o servidor.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAF9' }}>
      
      <div style={{ flex: 1, background: '#142C14', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, left: -100, width: 300, height: 300, background: 'rgba(228, 235, 156, 0.05)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: -50, right: -50, width: 400, height: 400, background: 'rgba(45, 81, 40, 0.4)', borderRadius: '50%' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 480 }}>
          <div style={{ background: '#FFFFFF', padding: 16, borderRadius: 20, display: 'inline-block', marginBottom: 32, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
            <img src={logo} alt="VoxFive" style={{ width: 160, display: 'block' }} />
          </div>
          
          <h1 style={{ color: '#FFFFFF', fontSize: 48, fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>
            Gestão de feedbacks simplificada.
          </h1>
          <p style={{ color: '#8DA750', fontSize: 18, lineHeight: 1.6 }}>
            Centralize as solicitações dos seus clientes e responda com agilidade em uma plataforma segura e intuitiva.
          </p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <h2 style={{ color: '#142C14', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Acesse sua conta</h2>
          <p style={{ color: '#667085', fontSize: 15, marginBottom: 32 }}>Insira suas credenciais para continuar.</p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#142C14' }}>Usuário</label>
              <input 
                type="text" 
                placeholder="Digite seu usuário" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                disabled={carregando} 
                required 
                style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid #E1E8E0', background: '#FFFFFF', outline: 'none', transition: 'border 0.2s', fontSize: 15 }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#142C14' }}>Senha</label>
              <input 
                type="password" 
                placeholder="Digite sua senha" 
                value={senha} 
                onChange={e => setSenha(e.target.value)} 
                disabled={carregando} 
                required 
                style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid #E1E8E0', background: '#FFFFFF', outline: 'none', transition: 'border 0.2s', fontSize: 15 }}
              />
            </div>
            
            <div style={{ minHeight: 24 }}>
              {erro && (
                <div style={{ color: '#A02020', fontSize: 13, background: '#FDECEC', padding: '12px 16px', borderRadius: 8, border: '1px solid #F5B7B7', textAlign: 'center', fontWeight: 500 }}>
                  {erro}
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={carregando} 
              style={{ padding: 16, background: carregando ? '#8DA750' : '#142C14', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: carregando ? 'not-allowed' : 'pointer', transition: 'background 0.2s', marginTop: 8 }}
            >
              {carregando ? 'Autenticando...' : 'Entrar no Sistema'}
            </button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
            <Link to="/recuperar-senha" style={{ color: '#667085', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              Esqueceu a senha?
            </Link>
            <Link to="/cadastro" style={{ color: '#2D5128', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

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
      else setErro('Erro ao conectar. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #142C14, #2D5128)' }}>
      <div style={{ background: '#fff', padding: 40, borderRadius: 16, width: '100%', maxWidth: 400, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        <h2 style={{ color: '#142C14', marginBottom: 8, textAlign: 'center', fontSize: 24, fontWeight: 800 }}>VoxSeven</h2>
        <p style={{ color: '#667085', textAlign: 'center', marginBottom: 24, fontSize: 14 }}>Acesse sua conta para continuar</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input type="text" placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} disabled={carregando} required />
          <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} disabled={carregando} required />
          
          <div style={{ minHeight: 40, display: 'flex', alignItems: 'center' }}>
            {erro && <p style={{ color: '#A02020', fontSize: 13, background: '#FDECEC', padding: '8px 12px', borderRadius: 6, width: '100%', margin: 0, border: '1px solid #F5B7B7' }}>{erro}</p>}
          </div>

          <button type="submit" disabled={carregando} style={{ padding: 14, background: carregando ? '#8DA750' : '#142C14', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 'bold', transition: 'background 0.2s' }}>
            {carregando ? 'Entrando...' : 'Entrar no Sistema'}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14 }}>
          <span style={{ color: '#667085' }}>Não tem uma conta? </span>
          <Link to="/cadastro" style={{ color: '#2D5128', fontWeight: 'bold', textDecoration: 'none' }}>Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
}
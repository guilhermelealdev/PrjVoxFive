import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/endpoints';
import logo from '../assets/logo.png';

export default function RecuperarSenha() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(1);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleSolicitarToken = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      await authApi.forgotPassword(email);
      setEtapa(2);
    } catch (error) {
      setErro('Erro ao solicitar recuperação. Verifique o e-mail.');
    } finally {
      setCarregando(false);
    }
  };

  const handleResetarSenha = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      await authApi.resetPassword(token, novaSenha);
      setSucesso(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      if (error.response?.status === 400) {
        const msg = error.response.data.message;
        if (msg.includes('Password must contain')) {
          setErro('A senha não atende aos requisitos mínimos de segurança.');
        } else {
          setErro(msg || 'Token inválido ou expirado.');
        }
      } else {
        setErro('Erro ao redefinir senha. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  if (sucesso) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: '#F8FAF9' }}>
        <div style={{ background: '#fff', padding: 40, borderRadius: 12, textAlign: 'center', maxWidth: 400, border: '1px solid #E1E8E0' }}>
          <h2 style={{ color: '#2D5128', marginBottom: 16 }}>Senha alterada!</h2>
          <p style={{ color: '#667085' }}>Sua senha foi redefinida com sucesso. Você será redirecionado para o login em instantes.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAF9' }}>
      
      <div style={{ flex: 1, background: '#142C14', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, left: -100, width: 300, height: 300, background: 'rgba(228, 235, 156, 0.05)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: -50, right: -50, width: 400, height: 400, background: 'rgba(45, 81, 40, 0.4)', borderRadius: '50%' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 480 }}>
          <div style={{ background: '#FFFFFF', padding: 16, borderRadius: 20, display: 'inline-block', marginBottom: 32, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
            <img src={logo} alt="VoxFive" style={{ width: 160, display: 'block' }} />
          </div>
          <h1 style={{ color: '#FFFFFF', fontSize: 40, fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>
            Recupere seu acesso.
          </h1>
          <p style={{ color: '#8DA750', fontSize: 18, lineHeight: 1.6 }}>
            Enviaremos um código seguro para você redefinir sua senha e voltar a usar a plataforma.
          </p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          
          <h2 style={{ color: '#142C14', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Recuperação de Senha</h2>
          <p style={{ color: '#667085', fontSize: 15, marginBottom: 32 }}>
            {etapa === 1 ? 'Insira seu e-mail para receber o token.' : 'Insira o token e sua nova senha.'}
          </p>

          {etapa === 1 ? (
            <form onSubmit={handleSolicitarToken} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#142C14' }}>E-mail cadastrado</label>
                <input 
                  type="email" 
                  placeholder="seuemail@exemplo.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  disabled={carregando} 
                  required 
                  style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid #E1E8E0', outline: 'none' }}
                />
              </div>
              {erro && <p style={{ color: '#A02020', fontSize: 13, background: '#FDECEC', padding: 10, borderRadius: 6, borderLeft: '3px solid #A02020' }}>{erro}</p>}
              <button type="submit" disabled={carregando} style={{ padding: 16, background: '#142C14', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
                {carregando ? 'Buscando...' : 'Enviar Token'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetarSenha} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: '#F8FAF9', padding: 16, borderRadius: 8, border: '1px solid #E1E8E0', fontSize: 13, color: '#667085' }}>
                <strong>Atenção:</strong> Como este é um ambiente de testes, o Token foi impresso no terminal do Backend. Copie e cole abaixo.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#142C14' }}>Token de Recuperação</label>
                <input 
                  type="text" 
                  placeholder="Cole o código gerado" 
                  value={token} 
                  onChange={e => setToken(e.target.value)} 
                  disabled={carregando} 
                  required 
                  style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid #E1E8E0', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#142C14' }}>Nova Senha</label>
                <input 
                  type="password" 
                  placeholder="Nova senha forte" 
                  value={novaSenha} 
                  onChange={e => setNovaSenha(e.target.value)} 
                  disabled={carregando} 
                  required 
                  style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid #E1E8E0', outline: 'none' }}
                />
                <span style={{ fontSize: 11, color: '#8DA750', marginTop: 4 }}>
                  Mínimo de 12 caracteres, incluindo maiúsculas, minúsculas, números e símbolos (@, #, etc).
                </span>
              </div>
              {erro && <p style={{ color: '#A02020', fontSize: 13, background: '#FDECEC', padding: 10, borderRadius: 6, borderLeft: '3px solid #A02020' }}>{erro}</p>}
              <button type="submit" disabled={carregando} style={{ padding: 16, background: '#142C14', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
                {carregando ? 'Redefinindo...' : 'Redefinir Senha'}
              </button>
            </form>
          )}

          <div style={{ marginTop: 32, textAlign: 'center', fontSize: 14 }}>
            <Link to="/login" style={{ color: '#2D5128', fontWeight: 700, textDecoration: 'none' }}>Lembrou a senha? Voltar ao login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
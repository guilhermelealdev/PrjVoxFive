import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usersApi } from '../api/endpoints';
import logo from '../assets/logo.png';

export default function Cadastro() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      await usersApi.criar({ username, password: senha, email });
      alert('Conta criada com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (error) {
      if (error.response?.status === 400) {
        const msg = error.response.data.message;
        if (msg.includes('Password must contain')) {
          setErro('A senha precisa de 12+ caracteres, maiúscula, minúscula, número e símbolo.');
        } else {
          setErro('Dados inválidos. Verifique os campos.');
        }
      } else if (error.response?.status === 409) {
        // AQUI ESTÁ A CORREÇÃO: O backend retorna 409 quando o e-mail ou usuário já existe
        setErro(error.response.data.message || 'E-mail ou usuário já cadastrado.');
      } else if (error.response?.status === 429) {
        setErro('Muitas tentativas. Aguarde um minuto e tente novamente.');
      } else {
        setErro('Erro ao criar conta. Verifique os dados ou tente mais tarde.');
      }
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
            Crie sua conta agora.
          </h1>
          <p style={{ color: '#8DA750', fontSize: 18, lineHeight: 1.6 }}>
            Tenha acesso à plataforma, envie seus feedbacks e acompanhe todas as respostas da nossa equipe em um só lugar.
          </p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <h2 style={{ color: '#142C14', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Cadastre-se</h2>
          <p style={{ color: '#667085', fontSize: 15, marginBottom: 32 }}>Preencha os dados abaixo para criar sua conta.</p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#142C14' }}>Nome de Usuário</label>
              <input 
                type="text" 
                placeholder="Como deseja ser chamado?" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                disabled={carregando}
                required 
                minLength={3}
                style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid #E1E8E0', background: '#FFFFFF', outline: 'none', transition: 'border 0.2s', fontSize: 15 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#142C14' }}>E-mail</label>
              <input 
                type="email" 
                placeholder="seuemail@exemplo.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                disabled={carregando}
                required 
                style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid #E1E8E0', background: '#FFFFFF', outline: 'none', transition: 'border 0.2s', fontSize: 15 }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#142C14' }}>Senha</label>
              <input 
                type="password" 
                placeholder="Crie uma senha forte" 
                value={senha} 
                onChange={e => setSenha(e.target.value)} 
                disabled={carregando}
                required 
                minLength={12}
                style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid #E1E8E0', background: '#FFFFFF', outline: 'none', transition: 'border 0.2s', fontSize: 15 }}
              />
              <span style={{ fontSize: 11, color: '#8DA750', marginTop: 4 }}>
                A senha deve conter no mínimo 12 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos (@, #, etc).
              </span>
            </div>
            
            <div style={{ minHeight: 24 }}>
              {erro && <p style={{ color: '#A02020', fontSize: 13, background: '#FDECEC', padding: '10px 14px', borderRadius: 6, margin: 0, borderLeft: '3px solid #A02020' }}>{erro}</p>}
            </div>

            <button 
              type="submit" 
              disabled={carregando} 
              style={{ padding: 16, background: carregando ? '#8DA750' : '#142C14', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: carregando ? 'not-allowed' : 'pointer', transition: 'background 0.2s', marginTop: 8 }}
            >
              {carregando ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>

          <div style={{ marginTop: 32, textAlign: 'center', fontSize: 14 }}>
            <span style={{ color: '#667085' }}>Já possui uma conta? </span>
            <Link to="/login" style={{ color: '#2D5128', fontWeight: 700, textDecoration: 'none' }}>Fazer login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
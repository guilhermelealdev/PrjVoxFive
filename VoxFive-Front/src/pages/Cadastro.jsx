import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usersApi } from '../api/endpoints';

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
          setErro('A senha precisa de 12+ caracteres, maiúscula, minúscula, número e símbolo (@, #, etc).');
        } else if (msg.includes('E-mail already exists')) {
          setErro('Este e-mail já está cadastrado.');
        } else if (msg.includes('Username already exists')) {
          setErro('Este nome de usuário já está em uso.');
        } else {
          setErro('Dados inválidos. Verifique os campos e tente novamente.');
        }
      } else {
        setErro('Erro ao criar conta. Tente novamente mais tarde.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #142C14, #2D5128)' }}>
      <div style={{ background: '#fff', padding: 40, borderRadius: 16, width: '100%', maxWidth: 400, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        <h2 style={{ color: '#142C14', marginBottom: 8, textAlign: 'center', fontSize: 24 }}>Criar Conta</h2>
        <p style={{ color: '#667085', textAlign: 'center', marginBottom: 24, fontSize: 14 }}>Cadastre-se para enviar feedbacks</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input type="text" placeholder="Nome de usuário" value={username} onChange={e => setUsername(e.target.value)} required minLength={3} />
          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Senha forte (A-z, 0-9, @#...)" value={senha} onChange={e => setSenha(e.target.value)} required minLength={12} />
          
          <div style={{ minHeight: 20 }}>
             {erro && <p style={{ color: '#A02020', fontSize: 13, background: '#FDECEC', padding: 10, borderRadius: 6, margin: 0 }}>{erro}</p>}
          </div>
          
          <button type="submit" disabled={carregando} style={{ padding: 14, background: carregando ? '#8DA750' : '#142C14', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 'bold' }}>
            {carregando ? 'Criando conta...' : 'Cadastrar'}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14 }}>
          <span style={{ color: '#667085' }}>Já tem uma conta? </span>
          <Link to="/login" style={{ color: '#2D5128', fontWeight: 'bold', textDecoration: 'none' }}>Faça login</Link>
        </div>
      </div>
    </div>
  );
}
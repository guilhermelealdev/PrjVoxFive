import { useState } from 'react';
import { usersApi } from '../api/endpoints';

export default function NovoAdmin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setCarregando(true);
    try {
      await usersApi.criarAdmin({ username, password: senha, email });
      setSucesso(`Administrador "${username}" criado com sucesso!`);
      setUsername(''); setEmail(''); setSenha('');
    } catch (error) {
      if (error.response?.status === 400) {
        const msg = error.response.data.message;
        if (msg.includes('Password must contain')) {
          setErro('A senha precisa de 12+ caracteres, maiúscula, minúscula, número e símbolo.');
        } else if (msg.includes('E-mail already exists')) {
          setErro('Este e-mail já está cadastrado.');
        } else if (msg.includes('Username already exists')) {
          setErro('Este nome de usuário já está em uso.');
        } else {
          setErro('Dados inválidos. Verifique os campos.');
        }
      } else if (error.response?.status === 403) {
        setErro('Acesso negado. Apenas administradores podem criar outros administradores.');
      } else {
        setErro('Erro ao criar administrador.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ color: '#142C14', fontSize: 24, marginBottom: 4, fontWeight: 700 }}>Gerenciar Administradores</h2>
        <p style={{ color: '#667085', fontSize: 14 }}>Crie novas contas com permissão total de acesso e consulta.</p>
      </div>

      <div style={{ background: '#fff', padding: 32, borderRadius: 12, border: '1px solid #E1E8E0', maxWidth: 500 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#142C14' }}>Nome de Usuário</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required minLength={3} style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #CCC' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#142C14' }}>E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #CCC' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#142C14' }}>Senha Forte</label>
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required minLength={12} placeholder="A-z, 0-9, @#..." style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #CCC' }} />
          </div>

          {erro && <p style={{ color: '#A02020', fontSize: 13, background: '#FDECEC', padding: 10, borderRadius: 6, margin: 0 }}>{erro}</p>}
          {sucesso && <p style={{ color: '#059669', fontSize: 13, background: '#ECFDF5', padding: 10, borderRadius: 6, margin: 0 }}>{sucesso}</p>}

          <button type="submit" disabled={carregando} style={{ padding: 14, background: '#142C14', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 700, marginTop: 8, cursor: 'pointer' }}>
            {carregando ? 'Criando...' : 'Cadastrar Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
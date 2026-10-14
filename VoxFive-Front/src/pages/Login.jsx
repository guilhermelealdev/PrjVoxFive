import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import ModalEsqueciSenha from '../components/ModalEsqueciSenha';
import ModalSolicitarAcesso from '../components/ModalSolicitarAcesso';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [tipoModal, setTipoModal] = useState(null);

  const tratarEnvio = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      await login(username, senha);
    } catch (error) {
      if (error.response?.status === 401) {
        setErro('Usuário ou senha inválidos.');
      } else if (error.response?.status === 429) {
        const retry = error.response.headers['retry-after'] || '60';
        setErro(`Muitas tentativas. Tente novamente em ${retry}s.`);
      } else if (!error.response) {
        setErro('Não foi possível contatar o servidor.');
      } else {
        setErro('Erro inesperado. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={estilos.conteiner}>
      <div style={estilos.cartao}>
        <div style={estilos.cabecalho}>
          <div style={estilos.etiqueta}>VoxFive</div>
          <h2 style={estilos.titulo}>Acessar Conta</h2>
          <p style={estilos.subtitulo}>Insira suas credenciais para continuar</p>
        </div>

        <form onSubmit={tratarEnvio} style={estilos.formulario}>
          <div style={estilos.grupoCampo}>
            <label>Usuário</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div style={estilos.grupoCampo}>
            <div style={estilos.linhaRotulo}>
              <label style={{ margin: 0 }}>Senha</label>
              <button
                type="button"
                onClick={() => setTipoModal('esqueci')}
                style={estilos.botaoEsqueci}
              >
                Esqueci minha senha
              </button>
            </div>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {erro && <div style={estilos.caixaErro}>{erro}</div>}

          <button type="submit" style={estilos.botaoPrimario} disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar no Sistema'}
          </button>
        </form>

        <div style={estilos.rodape}>
          <span>Não tem uma conta?</span>
          <button
            type="button"
            onClick={() => setTipoModal('solicitar')}
            style={estilos.botaoRegistro}
          >
            Solicite acesso
          </button>
        </div>
      </div>

      {tipoModal === 'esqueci' && <ModalEsqueciSenha aoFechar={() => setTipoModal(null)} />}
      {tipoModal === 'solicitar' && <ModalSolicitarAcesso aoFechar={() => setTipoModal(null)} />}
    </div>
  );
}

const estilos = {
  conteiner: {
    display: 'flex',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #142C14 0%, #2D5128 100%)',
    padding: 24
  },
  cartao: {
    background: '#FFFFFF',
    padding: '44px 36px',
    borderRadius: 20,
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.22)'
  },
  cabecalho: {
    textAlign: 'center',
    marginBottom: 32
  },
  etiqueta: {
    display: 'inline-block',
    background: '#E4EB9C',
    color: '#142C14',
    fontSize: 12,
    fontWeight: 'bold',
    padding: '6px 16px',
    borderRadius: 20,
    marginBottom: 16
  },
  titulo: {
    color: '#142C14',
    fontSize: 24,
    fontWeight: 700
  },
  subtitulo: {
    color: '#667085',
    fontSize: 14,
    marginTop: 6
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  grupoCampo: {
    display: 'flex',
    flexDirection: 'column'
  },
  linhaRotulo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  botaoEsqueci: {
    background: 'none',
    fontSize: 12,
    color: '#537B2F',
    fontWeight: 600
  },
  botaoPrimario: {
    marginTop: 12,
    padding: 14,
    background: '#142C14',
    color: '#FFFFFF',
    fontSize: 15,
    boxShadow: '0 4px 12px rgba(20, 44, 20, 0.25)'
  },
  caixaErro: {
    background: '#FDECEC',
    border: '1px solid #F5B7B7',
    color: '#A02020',
    padding: '10px 14px',
    borderRadius: 8,
    fontSize: 13
  },
  rodape: {
    marginTop: 28,
    textAlign: 'center',
    fontSize: 14,
    color: '#667085',
    display: 'flex',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botaoRegistro: {
    background: 'none',
    color: '#2D5128',
    fontWeight: 700
  }
};
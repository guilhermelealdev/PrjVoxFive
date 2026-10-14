import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MeusFeedbacks from './pages/MeusFeedbacks';
import NovoFeedback from './pages/NovoFeedback';
import ConfirmarEnvio from './pages/ConfirmarEnvio';
import { feedbacksApi } from './api/endpoints';
import { toInternalFeedback } from './api/mappers';

export default function App() {
  return (
    <AuthProvider>
      <ConteudoApp />
    </AuthProvider>
  );
}

function ConteudoApp() {
  const { autenticado, usuario, logout } = useAuth();
  const [paginaAtual, setPaginaAtual] = useState('feedbacks');
  const [feedbacks, setFeedbacks] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erroGlobal, setErroGlobal] = useState('');
  const [rascunhoFeedback, setRascunhoFeedback] = useState(null);

  useEffect(() => {
    if (!autenticado) {
      setFeedbacks([]);
      return;
    }
    setCarregando(true);
    setErroGlobal('');
    feedbacksApi
      .listMine()
      .then(({ data }) => setFeedbacks(data.map(toInternalFeedback)))
      .catch(() => setErroGlobal('Não foi possível carregar seus feedbacks.'))
      .finally(() => setCarregando(false));
  }, [autenticado]);

  const tratarIniciarNovoFeedback = () => {
    setPaginaAtual('novo');
  };

  const tratarContinuarFeedback = (dados) => {
    setRascunhoFeedback(dados);
    setPaginaAtual('confirmar');
  };

  const tratarConfirmarEnvio = async () => {
    const { data } = await feedbacksApi.create({
      type: rascunhoFeedback.categoria,
      message: rascunhoFeedback.descricao,
    });
    setFeedbacks([toInternalFeedback(data), ...feedbacks]);
    setRascunhoFeedback(null);
    setPaginaAtual('feedbacks');
  };

  if (!autenticado) {
    return <Login />;
  }

  return (
    <div>
      <div style={estilos.barraNavegacao}>
        <span style={{ fontSize: 12, fontWeight: 'bold' }}>
          Logado como: {usuario.username} ({usuario.role})
        </span>
        <button style={estilos.botaoNavegacao} onClick={() => setPaginaAtual('feedbacks')}>
          Meus Feedbacks ({feedbacks.length})
        </button>
        <button style={estilos.botaoNavegacao} onClick={() => setPaginaAtual('dashboard')}>
          Dashboard
        </button>
        <button
          style={{ ...estilos.botaoNavegacao, background: '#7A2E2E' }}
          onClick={logout}
        >
          Sair
        </button>
      </div>

      {erroGlobal && <div style={estilos.aviso}>{erroGlobal}</div>}

      {paginaAtual === 'dashboard' && (
        <Dashboard feedbacks={feedbacks} aoNavegar={setPaginaAtual} />
      )}

      {paginaAtual === 'feedbacks' && (
        <MeusFeedbacks
          feedbacks={feedbacks}
          carregando={carregando}
          aoNovoFeedback={tratarIniciarNovoFeedback}
        />
      )}

      {paginaAtual === 'novo' && (
        <NovoFeedback
          aoContinuar={tratarContinuarFeedback}
          aoVoltar={() => setPaginaAtual('feedbacks')}
        />
      )}

      {paginaAtual === 'confirmar' && (
        <ConfirmarEnvio
          dados={rascunhoFeedback}
          aoEditar={() => setPaginaAtual('novo')}
          aoConfirmar={tratarConfirmarEnvio}
        />
      )}
    </div>
  );
}

const estilos = {
  barraNavegacao: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    padding: '10px 20px',
    background: '#142C14',
    color: '#FFFFFF'
  },
  botaoNavegacao: {
    padding: '6px 12px',
    fontSize: 12,
    background: '#2D5128',
    color: '#FFFFFF'
  },
  aviso: {
    background: '#FDECEC',
    color: '#A02020',
    padding: '10px 20px',
    fontSize: 13
  }
};
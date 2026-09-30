import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MeusFeedbacks from './pages/MeusFeedbacks';
import NovoFeedback from './pages/NovoFeedback';
import ConfirmarEnvio from './pages/ConfirmarEnvio';

const dadosIniciais = [
  { id: 1, categoria: 'Suporte', mensagem: 'Dificuldade no acesso à conta.', status: 'Em análise', data: '25/05/2026' },
  { id: 2, categoria: 'Sistema', mensagem: 'Lentidão durante a geração de relatórios.', status: 'Respondido', resposta: 'Identificamos a lentidão e otimizamos o servidor.', data: '20/05/2026' },
  { id: 3, categoria: 'Atendimento', mensagem: 'Ótimo atendimento do suporte via chat.', status: 'Respondido', resposta: 'Agradecemos o elogio! Estamos sempre à disposição.', data: '15/05/2026' },
  { id: 4, categoria: 'Funcionalidade', mensagem: 'Sugestão de inclusão de gráfico exportável.', status: 'Em análise', data: '10/05/2026' },
];

export default function App() {
  const [paginaAtual, setPaginaAtual] = useState('login');
  const [feedbacks, setFeedbacks] = useState(dadosIniciais);
  const [rascunhoFeedback, setRascunhoFeedback] = useState(null);

  const tratarSucessoLogin = () => {
    setPaginaAtual('feedbacks');
  };

  const tratarIniciarNovoFeedback = () => {
    setPaginaAtual('novo');
  };

  const tratarContinuarFeedback = (dados) => {
    setRascunhoFeedback(dados);
    setPaginaAtual('confirmar');
  };

  const tratarConfirmarEnvio = () => {
    const novoItem = {
      id: Date.now(),
      categoria: rascunhoFeedback.categoria,
      mensagem: rascunhoFeedback.descricao,
      status: 'Em análise',
      data: new Date().toLocaleDateString('pt-BR')
    };

    setFeedbacks([novoItem, ...feedbacks]);
    setRascunhoFeedback(null);
    setPaginaAtual('feedbacks');
  };

  return (
    <div>
      <div style={estilos.barraNavegacao}>
        <span style={{ fontSize: 12, fontWeight: 'bold' }}>Navegação de Teste:</span>
        <button style={estilos.botaoNavegacao} onClick={() => setPaginaAtual('login')}>Login</button>
        <button style={estilos.botaoNavegacao} onClick={() => setPaginaAtual('feedbacks')}>Meus Feedbacks ({feedbacks.length})</button>
        <button style={estilos.botaoNavegacao} onClick={() => setPaginaAtual('dashboard')}>Dashboard</button>
      </div>

      {paginaAtual === 'login' && (
        <Login aoSucessoLogin={tratarSucessoLogin} />
      )}

      {paginaAtual === 'dashboard' && (
        <Dashboard feedbacks={feedbacks} aoNavegar={setPaginaAtual} />
      )}

      {paginaAtual === 'feedbacks' && (
        <MeusFeedbacks 
          feedbacks={feedbacks} 
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
  }
};
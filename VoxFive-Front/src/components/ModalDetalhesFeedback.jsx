import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { feedbacksApi } from '../api/endpoints';
import { formatarData } from '../api/mappers';

export default function ModalDetalhesFeedback({ feedback, aoFechar, aoAtualizar }) {
  const { usuario } = useAuth();
  const [resposta, setResposta] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  if (!feedback) return null;

  const handleResponder = async () => {
    if (!resposta.trim()) return;
    setEnviando(true);
    try {
      await feedbacksApi.responder(feedback.id, resposta);
      aoAtualizar();
      aoFechar();
    } catch (error) {
      alert('Erro ao responder feedback.');
    } finally {
      setEnviando(false);
    }
  };

  const handleExcluir = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este feedback permanentemente?')) return;
    
    setExcluindo(true);
    try {
      await feedbacksApi.deletar(feedback.id);
      aoAtualizar();
      aoFechar();
    } catch (error) {
      alert('Erro ao excluir feedback.');
    } finally {
      setExcluindo(false);
    }
  };

  return (
    <div style={estilos.camadaSobreposta}>
      <div style={estilos.caixaModal}>
        <div style={estilos.cabecalho}>
          <span style={estilos.etiqueta}>{feedback.type}</span>
          <span style={feedback.status === 'Respondido' ? estilos.statusSucesso : estilos.statusPendente}>
            {feedback.status}
          </span>
        </div>

        <div style={estilos.secaoTitulo}>
          <h3 style={estilos.titulo}>Detalhes do Feedback</h3>
          <p style={estilos.data}>Enviado em {formatarData(feedback.creation)}</p>
        </div>

        <div style={estilos.secao}>
          <label style={estilos.rotulo}>Mensagem do Usuário</label>
          <div style={estilos.caixaConteudo}>{feedback.message}</div>
        </div>

        {feedback.response ? (
          <div style={estilos.secao}>
            <label style={estilos.rotulo}>Resposta Oficial</label>
            <div style={{ fontSize: 12, color: '#667085', marginBottom: 6, fontWeight: 600 }}>
              Respondido por: <span style={{ color: '#142C14' }}>{feedback.answeredBy || 'Admin'}</span>
            </div>
            <div style={estilos.caixaResposta}>{feedback.response}</div>
          </div>
        ) : usuario.role === 'ADMIN' ? (
          <div style={estilos.secao}>
            <label style={estilos.rotulo}>Responder Feedback (Admin)</label>
            <textarea
              rows="3"
              placeholder="Digite a resposta para o usuário..."
              value={resposta}
              onChange={(e) => setResposta(e.target.value)}
              style={{ padding: 12, borderRadius: 8, border: '1px solid #E1E8E0', width: '100%', resize: 'vertical' }}
            />
            <button 
              onClick={handleResponder} 
              disabled={enviando}
              style={estilos.botaoResponder}
            >
              {enviando ? 'Enviando...' : 'Enviar Resposta'}
            </button>
          </div>
        ) : null}

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          {usuario.role === 'ADMIN' && (
            <button 
              style={estilos.botaoExcluir} 
              onClick={handleExcluir}
              disabled={excluindo}
            >
              {excluindo ? 'Excluindo...' : 'Excluir Feedback'}
            </button>
          )}
          <button style={estilos.botaoFechar} onClick={aoFechar}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

const estilos = {
  camadaSobreposta: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(20, 44, 20, 0.45)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1000
  },
  caixaModal: {
    background: '#FFFFFF',
    padding: 32,
    borderRadius: 12,
    width: '100%',
    maxWidth: 500,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18)',
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  cabecalho: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  etiqueta: {
    background: '#F3F6F3',
    color: '#142C14',
    padding: '6px 14px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 'bold',
    border: '1px solid #E1E8E0'
  },
  statusSucesso: {
    background: '#ECFDF5',
    color: '#059669',
    padding: '4px 12px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600
  },
  statusPendente: {
    background: '#FFFBEB',
    color: '#D97706',
    padding: '4px 12px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600
  },
  secaoTitulo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  },
  titulo: {
    color: '#142C14',
    fontSize: 20,
    fontWeight: 700
  },
  data: {
    fontSize: 13,
    color: '#667085'
  },
  secao: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  rotulo: {
    fontSize: 13,
    fontWeight: 600,
    color: '#142C14'
  },
  caixaConteudo: {
    background: '#FAFCFA',
    padding: 16,
    borderRadius: 10,
    border: '1px solid #E1E8E0',
    fontSize: 14,
    color: '#333333',
    lineHeight: '1.6'
  },
  caixaResposta: {
    background: '#F8FAF9',
    padding: 16,
    borderRadius: 10,
    border: '1px solid #E1E8E0',
    fontSize: 14,
    color: '#333333',
    lineHeight: '1.6'
  },
  botaoResponder: {
    marginTop: 8, 
    padding: 10, 
    background: '#142C14', 
    color: '#fff', 
    borderRadius: 6, 
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer'
  },
  botaoExcluir: {
    flex: 1,
    padding: 12,
    background: '#FDECEC',
    color: '#A02020',
    border: '1px solid #F5B7B7',
    borderRadius: 8,
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  botaoFechar: {
    flex: 1,
    padding: 12,
    background: 'transparent',
    color: '#142C14',
    border: '1px solid #E1E8E0',
    borderRadius: 8,
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};
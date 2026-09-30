export default function ModalDetalhesFeedback({ feedback, aoFechar }) {
  if (!feedback) return null;

  return (
    <div style={estilos.camadaSobreposta}>
      <div style={estilos.caixaModal}>
        <div style={estilos.cabecalho}>
          <span style={estilos.etiqueta}>{feedback.categoria}</span>
          <span style={feedback.status === 'Respondido' ? estilos.statusSucesso : estilos.statusPendente}>
            {feedback.status}
          </span>
        </div>

        <div style={estilos.secaoTitulo}>
          <h3 style={estilos.titulo}>Detalhes do Feedback</h3>
          <p style={estilos.data}>Enviado em {feedback.data}</p>
        </div>

        <div style={estilos.secao}>
          <label style={estilos.rotulo}>Sua mensagem</label>
          <div style={estilos.caixaConteudo}>{feedback.mensagem}</div>
        </div>

        {feedback.resposta && (
          <div style={estilos.secao}>
            <label style={estilos.rotulo}>Resposta da Equipe</label>
            <div style={estilos.caixaResposta}>{feedback.resposta}</div>
          </div>
        )}

        <button style={estilos.botaoFechar} onClick={aoFechar}>
          Fechar
        </button>
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
    borderRadius: 16,
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
    background: '#2D5128',
    color: '#FFFFFF',
    padding: '4px 12px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600
  },
  statusPendente: {
    background: '#E4EB9C',
    color: '#142C14',
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
    background: '#F3F6F3',
    padding: 16,
    borderRadius: 10,
    border: '1px solid #2D5128',
    fontSize: 14,
    color: '#142C14',
    lineHeight: '1.6'
  },
  botaoFechar: {
    width: '100%',
    padding: 12,
    background: '#142C14',
    color: '#FFFFFF',
    marginTop: 8
  }
};
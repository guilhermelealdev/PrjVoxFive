export default function ConfirmarEnvio({ dados, aoEditar, aoConfirmar }) {
  return (
    <div style={estilos.conteiner}>
      <div style={estilos.cartao}>
        <button style={estilos.botaoVoltar} onClick={aoEditar}>
          ← Voltar
        </button>

        <div style={estilos.cabecalho}>
          <h2 style={estilos.titulo}>CONFIRMAR ENVIO</h2>
          <p style={estilos.subtitulo}>Confira os dados antes de registrar seu feedback</p>
        </div>

        <div style={estilos.caixaResumo}>
          <h4 style={estilos.tituloResumo}>Resumo do feedback</h4>
          <div style={estilos.linhaResumo}>
            <strong>Categoria:</strong>
            <span>{dados?.categoria || 'Não informada'}</span>
          </div>
          <div style={estilos.colunaResumo}>
            <strong>Descrição:</strong>
            <p style={estilos.textoResumo}>{dados?.descricao || 'Sem descrição'}</p>
          </div>
        </div>

        <div style={estilos.caixaAlerta}>
          <strong>Tem certeza que deseja enviar?</strong>
          <p style={estilos.textoAlerta}>
            Após enviado, seu feedback será analisado pela nossa equipe.
          </p>
        </div>

        <div style={estilos.acoes}>
          <button style={estilos.botaoSecundario} onClick={aoEditar}>
            Editar
          </button>
          <button style={estilos.botaoPrimario} onClick={aoConfirmar}>
            Confirmar Envio
          </button>
        </div>
      </div>
    </div>
  );
}

const estilos = {
  conteiner: {
    display: 'flex',
    justifyContent: 'center',
    padding: '48px 20px'
  },
  cartao: {
    background: '#FFFFFF',
    padding: 36,
    borderRadius: 20,
    width: '100%',
    maxWidth: 520,
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  },
  botaoVoltar: {
    background: 'none',
    color: '#2D5128',
    fontSize: 14,
    fontWeight: 600,
    alignSelf: 'flex-start'
  },
  cabecalho: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  titulo: {
    color: '#142C14',
    fontSize: 22,
    fontWeight: 700
  },
  subtitulo: {
    color: '#667085',
    fontSize: 14
  },
  caixaResumo: {
    border: '1px solid #E1E8E0',
    borderRadius: 12,
    padding: 20,
    background: '#FAFCFA',
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  tituloResumo: {
    color: '#142C14',
    fontSize: 15,
    fontWeight: 700
  },
  linhaResumo: {
    display: 'flex',
    gap: 8,
    fontSize: 14
  },
  colunaResumo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    fontSize: 14
  },
  textoResumo: {
    color: '#667085',
    lineHeight: '1.5'
  },
  caixaAlerta: {
    border: '1px solid #E4EB9C',
    background: '#FFFDF0',
    borderRadius: 12,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  },
  textoAlerta: {
    fontSize: 13,
    color: '#667085'
  },
  acoes: {
    display: 'flex',
    gap: 12,
    justifyContent: 'flex-end',
    marginTop: 8
  },
  botaoSecundario: {
    background: '#F3F6F3',
    border: '1px solid #E1E8E0',
    color: '#142C14',
    padding: '12px 24px'
  },
  botaoPrimario: {
    background: '#142C14',
    color: '#FFFFFF',
    padding: '12px 24px'
  }
};
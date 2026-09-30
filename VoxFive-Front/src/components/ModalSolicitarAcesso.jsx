import { useState } from 'react';

export default function ModalSolicitarAcesso({ aoFechar }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [motivo, setMotivo] = useState('');
  const [enviado, setEnviado] = useState(false);

  const tratarEnvio = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div style={estilos.camadaSobreposta}>
      <div style={estilos.caixaModal}>
        <h3 style={estilos.titulo}>Solicitar Acesso</h3>

        {!enviado ? (
          <form onSubmit={tratarEnvio} style={estilos.formulario}>
            <p style={estilos.descricao}>
              Preencha o formulário para enviar seu pedido de cadastro para aprovação.
            </p>

            <div style={estilos.grupoCampo}>
              <label>Nome completo</label>
              <input 
                type="text" 
                placeholder="Seu nome completo" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                required 
              />
            </div>

            <div style={estilos.grupoCampo}>
              <label>E-mail corporativo</label>
              <input 
                type="email" 
                placeholder="nome@empresa.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div style={estilos.grupoCampo}>
              <label>Motivo do acesso</label>
              <textarea 
                rows="3" 
                placeholder="Descreva brevemente o motivo..." 
                value={motivo} 
                onChange={(e) => setMotivo(e.target.value)} 
                required 
              />
            </div>

            <div style={estilos.acoes}>
              <button type="button" style={estilos.botaoSecundario} onClick={aoFechar}>
                Cancelar
              </button>
              <button type="submit" style={estilos.botaoPrimario}>
                Enviar Solicitação
              </button>
            </div>
          </form>
        ) : (
          <div style={estilos.caixaSucesso}>
            <p style={estilos.textoSucesso}>
              Sua solicitação de acesso foi enviada com sucesso! Analisaremos seus dados em breve.
            </p>
            <button style={estilos.botaoPrimarioTotal} onClick={aoFechar}>
              Entendi
            </button>
          </div>
        )}
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
    maxWidth: 460,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  titulo: {
    color: '#142C14',
    fontSize: 20,
    fontWeight: 700
  },
  descricao: {
    fontSize: 14,
    color: '#667085',
    lineHeight: '1.5'
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginTop: 8
  },
  grupoCampo: {
    display: 'flex',
    flexDirection: 'column'
  },
  acoes: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 12
  },
  botaoSecundario: {
    background: '#F3F6F3',
    border: '1px solid #E1E8E0',
    color: '#142C14',
    padding: '12px 20px'
  },
  botaoPrimario: {
    background: '#142C14',
    color: '#FFFFFF',
    padding: '12px 20px'
  },
  botaoPrimarioTotal: {
    background: '#142C14',
    color: '#FFFFFF',
    padding: '12px 20px',
    width: '100%',
    marginTop: 16
  },
  caixaSucesso: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 8
  },
  textoSucesso: {
    fontSize: 14,
    color: '#2D5128',
    lineHeight: '1.5',
    fontWeight: 500
  }
};
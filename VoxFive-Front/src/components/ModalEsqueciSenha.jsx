import { useState } from 'react';

export default function ModalEsqueciSenha({ aoFechar }) {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const tratarEnvio = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div style={estilos.camadaSobreposta}>
      <div style={estilos.caixaModal}>
        <h3 style={estilos.titulo}>Recuperar Senha</h3>

        {!enviado ? (
          <form onSubmit={tratarEnvio} style={estilos.formulario}>
            <p style={estilos.descricao}>
              Digite seu e-mail cadastrado para receber o link de redefinição.
            </p>

            <div style={estilos.grupoCampo}>
              <label>E-mail de cadastro</label>
              <input 
                type="email" 
                placeholder="seuemail@exemplo.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div style={estilos.acoes}>
              <button type="button" style={estilos.botaoSecundario} onClick={aoFechar}>
                Cancelar
              </button>
              <button type="submit" style={estilos.botaoPrimario}>
                Enviar Link
              </button>
            </div>
          </form>
        ) : (
          <div style={estilos.caixaSucesso}>
            <p style={estilos.textoSucesso}>
              Link de recuperação enviado com sucesso para:
            </p>
            <strong style={estilos.destaqueEmail}>{email}</strong>

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
    maxWidth: 440,
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
    gap: 20,
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
    marginTop: 8
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
    color: '#667085'
  },
  destaqueEmail: {
    fontSize: 15,
    color: '#2D5128',
    wordBreak: 'break-all'
  }
};
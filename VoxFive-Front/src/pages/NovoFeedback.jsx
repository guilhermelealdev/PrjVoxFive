import { useState } from 'react';

export default function NovoFeedback({ aoContinuar, aoVoltar }) {
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');

  const tratarProximo = (e) => {
    e.preventDefault();
    if (!categoria || !descricao) return alert('Preencha todos os campos!');
    aoContinuar({ categoria, descricao });
  };

  return (
    <div style={estilos.conteiner}>
      <div style={estilos.cartao}>
        <button style={estilos.botaoVoltar} onClick={aoVoltar}>
          ← Voltar
        </button>

        <div style={estilos.cabecalho}>
          <h2 style={estilos.titulo}>NOVO FEEDBACK</h2>
          <p style={estilos.subtitulo}>Selecione a categoria e relate seu problema ou sugestão</p>
        </div>

        <form onSubmit={tratarProximo} style={estilos.formulario}>
          <div style={estilos.grupoCampo}>
            <label>Categoria</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
              <option value="">Selecione uma categoria</option>
              <option value="Suporte">Suporte</option>
              <option value="Sistema">Sistema</option>
              <option value="Atendimento">Atendimento</option>
              <option value="Funcionalidade">Funcionalidade</option>
              <option value="Sugestão">Sugestão</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div style={estilos.grupoCampo}>
            <label>Descreva seu problema ou sugestão</label>
            <textarea 
              rows="5" 
              placeholder="Escreva detalhadamente aqui..." 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)}
              required 
            />
          </div>

          <button type="submit" style={estilos.botaoEnviar}>
            Continuar
          </button>
        </form>
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
  botaoEnviar: {
    background: '#142C14',
    color: '#FFFFFF',
    padding: 14,
    fontSize: 15,
    marginTop: 8
  }
};
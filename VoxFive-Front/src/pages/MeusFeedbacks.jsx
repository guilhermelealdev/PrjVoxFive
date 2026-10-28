import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModalDetalhesFeedback from '../components/ModalDetalhesFeedback';
import { feedbacksApi } from '../api/endpoints';
import { useAuth } from '../auth/AuthContext';
import { formatarData } from '../api/mappers';

export default function MeusFeedbacks() {
  const { usuario } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [aba, setAba] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [feedbackSelecionado, setFeedbackSelecionado] = useState(null);

  const carregarDados = () => {
    setCarregando(true);
    const promise = usuario.role === 'ADMIN' 
      ? feedbacksApi.listarTodos() 
      : feedbacksApi.listarMeus();

    promise
      .then(res => setFeedbacks(res.data))
      .catch(() => alert('Erro ao carregar feedbacks'))
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const filtrados = feedbacks.filter((f) => {
    const statusMatch = 
      aba === 'Todos' ? true :
      aba === 'Em análise' ? f.status === 'Em análise' :
      f.status === 'Respondido';

    const termo = busca.toLowerCase();
    const buscaMatch = f.type.toLowerCase().includes(termo) || f.message.toLowerCase().includes(termo);

    return statusMatch && buscaMatch;
  });

  return (
    <div style={estilos.conteiner}>
      <div style={estilos.cartao}>
        <div style={estilos.cabecalho}>
          <h2 style={estilos.titulo}>{usuario.role === 'ADMIN' ? 'TODOS OS FEEDBACKS' : 'MEUS FEEDBACKS'}</h2>
          <p style={estilos.subtitulo}>Gerencie, filtre e acompanhe as solicitações</p>
        </div>

        <div style={estilos.conteinerBusca}>
          <input
            type="text"
            placeholder="Pesquisar por categoria ou mensagem..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div style={estilos.abas}>
          {['Todos', 'Em análise', 'Respondidos'].map((a) => (
            <button
              key={a}
              style={aba === a ? estilos.abaAtiva : estilos.aba}
              onClick={() => setAba(a)}
            >
              {a}
            </button>
          ))}
        </div>

        <div style={estilos.lista}>
          {carregando ? (
            <div style={estilos.caixaVazia}><p>Carregando...</p></div>
          ) : filtrados.length === 0 ? (
            <div style={estilos.caixaVazia}><p>Nenhum feedback encontrado.</p></div>
          ) : (
            filtrados.map((item) => (
              <div key={item.id} style={estilos.cartaoItem} onClick={() => setFeedbackSelecionado(item)}>
                <div style={estilos.itemPrincipal}>
                  <strong style={estilos.categoriaItem}>{item.type}</strong>
                  <p style={estilos.mensagemItem}>{item.message}</p>
                </div>
                <div style={estilos.itemLateral}>
                  <span style={item.status === 'Respondido' ? estilos.etiquetaSucesso : estilos.etiquetaPendente}>
                    {item.status}
                  </span>
                  <span style={estilos.dataItem}>{formatarData(item.creation)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {usuario.role !== 'ADMIN' && (
          <Link to="/ocorrencias/nova" style={{ textDecoration: 'none' }}>
            <button style={estilos.botaoNovo}>+ Novo feedback</button>
          </Link>
        )}
      </div>

      {feedbackSelecionado && (
        <ModalDetalhesFeedback
          feedback={feedbackSelecionado}
          aoFechar={() => setFeedbackSelecionado(null)}
          aoAtualizar={carregarDados}
        />
      )}
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
    maxWidth: 640,
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: 24
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
  conteinerBusca: {
    width: '100%'
  },
  abas: {
    display: 'flex',
    borderBottom: '2px solid #E1E8E0',
    gap: 8
  },
  aba: {
    flex: 1,
    padding: '12px 8px',
    background: 'none',
    color: '#667085',
    borderRadius: 0,
    fontSize: 14,
    fontWeight: 500
  },
  abaAtiva: {
    flex: 1,
    padding: '12px 8px',
    background: 'none',
    color: '#2D5128',
    borderBottom: '3px solid #2D5128',
    fontWeight: 700,
    borderRadius: 0,
    fontSize: 14
  },
  lista: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    minHeight: 180
  },
  caixaVazia: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    color: '#667085',
    fontSize: 14
  },
  cartaoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    border: '1px solid #E1E8E0',
    borderRadius: 12,
    cursor: 'pointer',
    background: '#FAFCFA',
    gap: 16,
    transition: 'border-color 0.2s, box-shadow 0.2s'
  },
  itemPrincipal: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    overflow: 'hidden'
  },
  categoriaItem: {
    fontSize: 15,
    color: '#142C14'
  },
  mensagemItem: {
    fontSize: 13,
    color: '#667085',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  itemLateral: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 6,
    minWidth: 100
  },
  etiquetaPendente: {
    background: '#E4EB9C',
    color: '#142C14',
    padding: '4px 10px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600
  },
  etiquetaSucesso: {
    background: '#2D5128',
    color: '#FFFFFF',
    padding: '4px 10px',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600
  },
  dataItem: {
    fontSize: 12,
    color: '#999999'
  },
  botaoNovo: {
    width: '100%',
    padding: 14,
    background: '#142C14',
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 8,
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 600
  }
};
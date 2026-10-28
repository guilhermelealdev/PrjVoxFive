import { useEffect, useState } from 'react';
import { feedbacksApi } from '../api/endpoints';
import { formatarData } from '../api/mappers';

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    feedbacksApi.listarTodos()
      .then(res => setFeedbacks(res.data))
      .catch(() => alert('Erro ao carregar dados do dashboard'))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) return <p style={{ textAlign: 'center', marginTop: 40 }}>Carregando métricas...</p>;

  const total = feedbacks.length;
  const pendentes = feedbacks.filter(f => f.status === 'Em análise').length;
  const respondidos = feedbacks.filter(f => f.status === 'Respondido').length;
  const taxaResolucao = total === 0 ? 0 : Math.round((respondidos / total) * 100);

  const categorias = ['Suporte', 'Sistema', 'Atendimento', 'Funcionalidade', 'Sugestão', 'Outros'];
  const porCategoria = categorias
    .map(cat => ({ nome: cat, qtd: feedbacks.filter(f => f.type === cat).length }))
    .filter(c => c.qtd > 0)
    .sort((a, b) => b.qtd - a.qtd); 

  const recentes = [...feedbacks]
    .sort((a, b) => new Date(b.creation) - new Date(a.creation))
    .slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: '#142C14', fontSize: 24, marginBottom: 4, fontWeight: 700 }}>Visão Geral</h2>
          <p style={{ color: '#667085', fontSize: 14 }}>Acompanhe o desempenho do atendimento.</p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #E1E8E0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <p style={{ fontSize: 13, color: '#667085', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Total Recebidos</p>
          <h1 style={{ fontSize: 32, color: '#142C14', marginTop: 4, fontWeight: 700 }}>{total}</h1>
        </div>
        <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #E1E8E0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <p style={{ fontSize: 13, color: '#667085', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Pendentes</p>
          <h1 style={{ fontSize: 32, color: '#D97706', marginTop: 4, fontWeight: 700 }}>{pendentes}</h1>
        </div>
        <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #E1E8E0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <p style={{ fontSize: 13, color: '#667085', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Respondidos</p>
          <h1 style={{ fontSize: 32, color: '#059669', marginTop: 4, fontWeight: 700 }}>{respondidos}</h1>
        </div>
        <div style={{ background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #E1E8E0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 13, color: '#667085', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Taxa de Resolução</p>
            <h1 style={{ fontSize: 32, color: '#142C14', marginTop: 4, fontWeight: 700 }}>{taxaResolucao}%</h1>
          </div>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: `conic-gradient(#2D5128 ${taxaResolucao}%, #E1E8E0 ${taxaResolucao}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff' }}></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        
        <div style={{ background: '#fff', padding: 24, borderRadius: 12, border: '1px solid #E1E8E0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <h3 style={{ color: '#142C14', fontSize: 16, marginBottom: 20, fontWeight: 700 }}>Volume por Categoria</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {porCategoria.length === 0 && <p style={{ color: '#667085', fontSize: 13 }}>Nenhum dado registrado.</p>}
            {porCategoria.map(cat => {
              const porcentagem = Math.round((cat.qtd / total) * 100);
              return (
                <div key={cat.nome}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#333' }}>
                    <span>{cat.nome}</span>
                    <span style={{ color: '#667085' }}>{cat.qtd} ({porcentagem}%)</span>
                  </div>
                  <div style={{ width: '100%', height: 8, background: '#F3F6F3', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${porcentagem}%`, height: '100%', background: '#2D5128', borderRadius: 4 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: '#fff', padding: 24, borderRadius: 12, border: '1px solid #E1E8E0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <h3 style={{ color: '#142C14', fontSize: 16, marginBottom: 20, fontWeight: 700 }}>Últimas Atividades</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {recentes.length === 0 && <p style={{ color: '#667085', fontSize: 13 }}>Nenhuma atividade recente.</p>}
            {recentes.map(r => (
              <div key={r.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: 12, borderBottom: '1px solid #F0F0F0' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.status === 'Respondido' ? '#059669' : '#D97706', marginTop: 6, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ margin: 0, fontSize: 13, color: '#142C14', fontWeight: 600 }}>{r.type}</p>
                    <span style={{ fontSize: 11, color: '#999' }}>{formatarData(r.creation)}</span>
                  </div>
                  <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#667085', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 280 }}>{r.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
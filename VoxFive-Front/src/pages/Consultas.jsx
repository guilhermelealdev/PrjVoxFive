import { useState } from 'react';
import { feedbacksApi } from '../api/endpoints';
import { formatarData } from '../api/mappers';

export default function Consultas() {
  const [filtros, setFiltros] = useState({ startDate: '', endDate: '', type: '', status: '' });
  const [resultados, setResultados] = useState([]);
  const [buscou, setBuscou] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleBuscar = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setBuscou(true);
    
    const params = {};
    if (filtros.startDate) params.startDate = new Date(filtros.startDate).toISOString();
    if (filtros.endDate) params.endDate = new Date(filtros.endDate + 'T23:59:59').toISOString();
    if (filtros.type) params.type = filtros.type;
    if (filtros.status) params.status = filtros.status;

    try {
      const { data } = await feedbacksApi.buscarComFiltros(params);
      setResultados(data);
    } catch (error) {
      alert('Erro ao buscar dados');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ color: '#142C14', fontSize: 24, marginBottom: 4, fontWeight: 700 }}>Consultas Avançadas</h2>
        <p style={{ color: '#667085', fontSize: 14 }}>Gere relatórios personalizados por data, tipo e status.</p>
      </div>

      <form onSubmit={handleBuscar} style={{ background: '#fff', padding: 24, borderRadius: 12, border: '1px solid #E1E8E0', display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#142C14' }}>Data Inicial</label>
          <input type="date" value={filtros.startDate} onChange={e => setFiltros({...filtros, startDate: e.target.value})} style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #CCC' }} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#142C14' }}>Data Final</label>
          <input type="date" value={filtros.endDate} onChange={e => setFiltros({...filtros, endDate: e.target.value})} style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #CCC' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#142C14' }}>Tipo</label>
          <select value={filtros.type} onChange={e => setFiltros({...filtros, type: e.target.value})} style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #CCC', background: '#fff' }}>
            <option value="">Todos</option>
            <option value="Suporte">Suporte</option>
            <option value="Sistema">Sistema</option>
            <option value="Atendimento">Atendimento</option>
            <option value="Funcionalidade">Funcionalidade</option>
            <option value="Sugestão">Sugestão</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#142C14' }}>Status</label>
          <select value={filtros.status} onChange={e => setFiltros({...filtros, status: e.target.value})} style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #CCC', background: '#fff' }}>
            <option value="">Todos</option>
            <option value="Em análise">Em análise</option>
            <option value="Respondido">Respondido</option>
          </select>
        </div>

        <button type="submit" disabled={carregando} style={{ padding: '10px 24px', background: '#142C14', color: '#fff', borderRadius: 6, fontWeight: 700, border: 'none', cursor: 'pointer', height: 40 }}>
          {carregando ? 'Buscando...' : 'Filtrar'}
        </button>
      </form>

      {buscou && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E1E8E0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
            <thead style={{ background: '#F8FAF9', borderBottom: '1px solid #E1E8E0' }}>
              <tr>
                <th style={{ padding: '16px', color: '#667085', fontWeight: 600 }}>ID</th>
                <th style={{ padding: '16px', color: '#667085', fontWeight: 600 }}>Data</th>
                <th style={{ padding: '16px', color: '#667085', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '16px', color: '#667085', fontWeight: 600 }}>Mensagem</th>
                <th style={{ padding: '16px', color: '#667085', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px', color: '#667085', fontWeight: 600 }}>Respondido por</th>
              </tr>
            </thead>
            <tbody>
              {resultados.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: '#667085' }}>Nenhum resultado encontrado.</td>
                </tr>
              ) : (
                resultados.map(r => (
                  <tr key={r.id} style={{ borderBottom: '1px solid #F0F0F0' }}>
                    <td style={{ padding: '16px', color: '#333' }}>#{r.id}</td>
                    <td style={{ padding: '16px', color: '#333' }}>{formatarData(r.creation)}</td>
                    <td style={{ padding: '16px', fontWeight: 600, color: '#142C14' }}>{r.type}</td>
                    <td style={{ padding: '16px', color: '#667085', maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.message}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700, background: r.status === 'Respondido' ? '#ECFDF5' : '#FFFBEB', color: r.status === 'Respondido' ? '#059669' : '#D97706' }}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: '#333', fontWeight: 600 }}>{r.answeredBy || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
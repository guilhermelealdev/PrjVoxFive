import { useEffect, useState } from 'react';
import { auditApi } from '../api/endpoints';
import { formatarData } from '../api/mappers';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    auditApi.listar()
      .then(res => setLogs(res.data.reverse())) // Mais recentes primeiro
      .catch(() => alert('Erro ao carregar logs de auditoria'))
      .finally(() => setCarregando(false));
  }, []);

  const formatarAcao = (acao) => {
    const acoes = {
      'CRIAR_ADMIN': 'Criação de Admin',
      'DELETAR_CONTA': 'Exclusão de Conta',
      'DELETAR_FEEDBACK': 'Exclusão de Feedback'
    };
    return acoes[acao] || acao;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ color: '#142C14', fontSize: 24, marginBottom: 4, fontWeight: 700 }}>Trilha de Auditoria</h2>
        <p style={{ color: '#667085', fontSize: 14 }}>Acompanhe as ações sensíveis realizadas no sistema.</p>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E1E8E0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
          <thead style={{ background: '#F8FAF9', borderBottom: '1px solid #E1E8E0' }}>
            <tr>
              <th style={{ padding: '16px', color: '#667085', fontWeight: 600 }}>Data/Hora</th>
              <th style={{ padding: '16px', color: '#667085', fontWeight: 600 }}>Ação</th>
              <th style={{ padding: '16px', color: '#667085', fontWeight: 600 }}>Realizada por</th>
              <th style={{ padding: '16px', color: '#667085', fontWeight: 600 }}>Alvo / Detalhe</th>
            </tr>
          </thead>
          <tbody>
            {carregando ? (
              <tr><td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#667085' }}>Carregando...</td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#667085' }}>Nenhum log registrado.</td></tr>
            ) : (
              logs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid #F0F0F0' }}>
                  <td style={{ padding: '16px', color: '#667085' }}>{formatarData(log.createdAt)}</td>
                  <td style={{ padding: '16px', fontWeight: 600, color: '#142C14' }}>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: 12, fontSize: 12, 
                      background: log.action === 'DELETAR_CONTA' ? '#FDECEC' : '#ECFDF5',
                      color: log.action === 'DELETAR_CONTA' ? '#A02020' : '#059669'
                    }}>
                      {formatarAcao(log.action)}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: '#333' }}>{log.actorUsername}</td>
                  <td style={{ padding: '16px', color: '#333', fontWeight: 500 }}>{log.targetUsername || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
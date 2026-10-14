export function toInternalFeedback(apiFeedback) {
  return {
    id: apiFeedback.id,
    categoria: apiFeedback.type,
    mensagem: apiFeedback.message,
    status: apiFeedback.status,
    data: formatarData(apiFeedback.creation),
    resposta: apiFeedback.response || '',
  };
}

function formatarData(creation) {
  if (!creation) return '';
  const [dataParte] = creation.split(' ');
  const [ano, mes, dia] = dataParte.split('-');
  return `${dia}/${mes}/${ano}`;
}
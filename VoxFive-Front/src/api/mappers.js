export function formatarData(dataString) {
  if (!dataString) return '';
  const data = new Date(dataString);
  if (Number.isNaN(data.getTime())) return dataString;
  return data.toLocaleDateString('pt-BR');
}
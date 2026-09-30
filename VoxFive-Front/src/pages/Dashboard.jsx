export default function Dashboard({ feedbacks = [], aoNavegar }) {
  const total = feedbacks.length;
  const emAnalise = feedbacks.filter(f => f.status === 'Em análise').length;
  const respondidos = feedbacks.filter(f => f.status === 'Respondido').length;

  const categorias = ['Suporte', 'Sistema', 'Atendimento', 'Funcionalidade', 'Sugestão', 'Outros'];

  const contagemCategorias = categorias.map(cat => {
    const qtd = feedbacks.filter(f => f.categoria === cat).length;
    return { categoria: cat, qtd };
  });

  const maiorQtd = Math.max(...contagemCategorias.map(c => c.qtd), 1);

  return (
    <div style={estilos.conteiner}>
      <aside style={estilos.barraLateral}>
        <h3 style={estilos.tituloMarca}>VoxFive</h3>
        <nav style={estilos.menuNavegacao}>
          <p style={estilos.itemMenuAtivo}>Dashboard</p>
          <p style={estilos.itemMenu} onClick={() => aoNavegar && aoNavegar('feedbacks')}>Feedbacks</p>
        </nav>
      </aside>

      <main style={estilos.conteudoPrincipal}>
        <div style={estilos.secaoCabecalho}>
          <h2 style={estilos.tituloPagina}>DASHBOARD</h2>
          <p style={estilos.subtituloPagina}>Acompanhe as estatísticas gerais em tempo real</p>
        </div>

        <div style={estilos.gradeIndicadores}>
          <div style={estilos.cartaoIndicador}>
            <span style={estilos.rotuloIndicador}>Total de feedbacks</span>
            <h1 style={estilos.valorIndicador}>{total}</h1>
          </div>
          <div style={estilos.cartaoIndicador}>
            <span style={estilos.rotuloIndicador}>Em análise</span>
            <h1 style={{ ...estilos.valorIndicador, color: '#537B2F' }}>{emAnalise}</h1>
          </div>
          <div style={estilos.cartaoIndicador}>
            <span style={estilos.rotuloIndicador}>Respondidos</span>
            <h1 style={{ ...estilos.valorIndicador, color: '#2D5128' }}>{respondidos}</h1>
          </div>
        </div>

        <div style={estilos.conteinerGrafico}>
          <h3 style={estilos.tituloGrafico}>Feedbacks por Categoria</h3>

          <div style={estilos.areaGrafico}>
            {contagemCategorias.map(item => {
              const alturaPercentual = (item.qtd / maiorQtd) * 100;
              return (
                <div key={item.categoria} style={estilos.grupoBarra}>
                  <span style={estilos.valorBarra}>{item.qtd}</span>
                  <div style={estilos.trilhoBarra}>
                    <div 
                      style={{
                        ...estilos.preenchimentoBarra,
                        height: `${Math.max(alturaPercentual, 6)}%`,
                        background: item.qtd > 0 ? '#2D5128' : '#E0E7DE'
                      }} 
                    />
                  </div>
                  <span style={estilos.rotuloBarra}>{item.categoria}</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

const estilos = {
  conteiner: {
    display: 'flex',
    minHeight: '100vh'
  },
  barraLateral: {
    width: 240,
    background: '#142C14',
    color: '#FFFFFF',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 32
  },
  tituloMarca: {
    color: '#E4EB9C',
    fontSize: 22,
    fontWeight: 700
  },
  menuNavegacao: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  itemMenuAtivo: {
    background: '#2D5128',
    padding: '12px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 600,
    color: '#FFFFFF'
  },
  itemMenu: {
    padding: '12px 16px',
    cursor: 'pointer',
    color: '#8DA750',
    fontWeight: 500,
    borderRadius: 8,
    transition: 'background 0.2s'
  },
  conteudoPrincipal: {
    flex: 1,
    padding: '40px 48px',
    display: 'flex',
    flexDirection: 'column',
    gap: 32
  },
  secaoCabecalho: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  },
  tituloPagina: {
    color: '#142C14',
    fontSize: 26,
    fontWeight: 700
  },
  subtituloPagina: {
    color: '#667085',
    fontSize: 14
  },
  gradeIndicadores: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 24
  },
  cartaoIndicador: {
    background: '#FFFFFF',
    padding: 24,
    borderRadius: 14,
    borderLeft: '6px solid #537B2F',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  rotuloIndicador: {
    fontSize: 13,
    color: '#667085',
    fontWeight: 600
  },
  valorIndicador: {
    fontSize: 36,
    fontWeight: 700,
    color: '#142C14'
  },
  conteinerGrafico: {
    background: '#FFFFFF',
    padding: 32,
    borderRadius: 16,
    border: '1px solid #E1E8E0',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  },
  tituloGrafico: {
    color: '#142C14',
    fontSize: 18,
    fontWeight: 700
  },
  areaGrafico: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 220,
    gap: 16,
    paddingTop: 20
  },
  grupoBarra: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end'
  },
  valorBarra: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#142C14',
    marginBottom: 8
  },
  trilhoBarra: {
    width: '100%',
    maxWidth: 42,
    height: 150,
    background: '#FAFCFA',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
    border: '1px solid #E1E8E0'
  },
  preenchimentoBarra: {
    width: '100%',
    borderRadius: 6,
    transition: 'height 0.4s ease'
  },
  rotuloBarra: {
    fontSize: 12,
    color: '#667085',
    marginTop: 12,
    textAlign: 'center',
    fontWeight: 500
  }
};
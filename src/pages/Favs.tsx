import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export default function Favs() {
  const { theme, favorites, removeFavorite } = useContext(GlobalContext);
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        padding: '30px',
        minHeight: '100vh',
        backgroundColor: isDark ? '#0f172a' : '#f8fafc',
        color: isDark ? '#ffffff' : '#0f172a',
        fontFamily: 'sans-serif',
      }}
    >
      <h2
        style={{ color: isDark ? '#ffffff' : '#0f172a', marginBottom: '20px' }}
      >
        ⭐ Dentistas Favoritos
      </h2>

      {favorites.length === 0 ? (
        <p
          style={{ color: isDark ? '#cbd5e1' : '#475569', fontSize: '1.1rem' }}
        >
          Ainda não adicionaste nenhum dentista aos favoritos.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          {favorites.map((dentist) => (
            <div
              key={dentist.matricula}
              style={{
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>👨‍⚕️</div>
              <h3
                style={{
                  margin: '8px 0',
                  color: isDark ? '#ffffff' : '#0f172a',
                }}
              >
                {dentist.nome} {dentist.sobrenome}
              </h3>
              <p
                style={{
                  color: isDark ? '#94a3b8' : '#64748b',
                  fontSize: '0.95rem',
                  margin: '4px 0 16px',
                }}
              >
                @{dentist.usuario?.username || dentist.nome.toLowerCase()}
              </p>

              <button
                onClick={() => removeFavorite(dentist.matricula)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  fontWeight: 'bold',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                }}
              >
                💔 Remover Favorito
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext, type Dentist } from '../context/GlobalContext';

export default function Home() {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme, addFavorite, removeFavorite, isFavorite, role } =
    useContext(GlobalContext);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        const mapped: Dentist[] = data.map((user: any) => ({
          matricula: String(user.id),
          nome: user.name.split(' ')[0],
          sobrenome: user.name.split(' ').slice(1).join(' ') || 'Silva',
          usuario: { username: user.username },
        }));
        setDentists(mapped);
        setLoading(false);
      });
  }, []);

  const isDark = theme === 'dark';

  // 🏥 VISÃO DO DENTISTA: Lista de Pacientes Marcados
  if (role === 'DENTIST') {
    return (
      <div
        style={{
          padding: '30px',
          minHeight: '100vh',
          backgroundColor: isDark ? '#0f172a' : '#f8fafc',
          color: isDark ? '#ffffff' : '#0f172a',
        }}
      >
        <h2>👨‍⚕️ Painel do Dentista - Pacientes Agendados</h2>
        <p style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
          Veja a lista de pacientes com consulta marcada para hoje:
        </p>

        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            maxWidth: '600px',
          }}
        >
          {[
            {
              id: 1,
              nome: 'Rodrigo Alves',
              horario: '09:00',
              procedimento: 'Limpeza e Consulta Geral',
            },
            {
              id: 2,
              nome: 'Camila Fernandes',
              horario: '10:30',
              procedimento: 'Avaliação de Aparelho',
            },
            {
              id: 3,
              nome: 'João Pedro',
              horario: '14:00',
              procedimento: 'Restauração Dente 36',
            },
          ].map((pacient) => (
            <div
              key={pacient.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 4px 0' }}>{pacient.nome}</h4>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: isDark ? '#38bdf8' : '#0284c7',
                  }}
                >
                  {pacient.procedimento}
                </span>
              </div>
              <span
                style={{
                  fontWeight: 'bold',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  backgroundColor: isDark ? '#334155' : '#e2e8f0',
                }}
              >
                ⏰ {pacient.horario}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 👤 VISÃO DO PACIENTE (ou visitante): Ver Dentistas e Vagas
  return (
    <div
      style={{
        padding: '30px',
        minHeight: '100vh',
        backgroundColor: isDark ? '#0f172a' : '#f8fafc',
        color: isDark ? '#ffffff' : '#0f172a',
      }}
    >
      <h2>DH Odonto - Dentistas e Vagas Disponíveis</h2>
      {loading ? (
        <p>Carregando dentistas...</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          {dentists.map((dentist) => {
            const fav = isFavorite(dentist.matricula);
            return (
              <div
                key={dentist.matricula}
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>👨‍⚕️</div>
                <Link
                  to={`/dentist/${dentist.matricula}`}
                  style={{ textDecoration: 'none' }}
                >
                  <h3
                    style={{
                      margin: '8px 0',
                      color: isDark ? '#38bdf8' : '#0284c7',
                    }}
                  >
                    {dentist.nome} {dentist.sobrenome}
                  </h3>
                </Link>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#10b981',
                    fontWeight: 'bold',
                  }}
                >
                  ✅ Vagas: 09:00, 14:30
                </p>
                <button
                  onClick={() =>
                    fav
                      ? removeFavorite(dentist.matricula)
                      : addFavorite(dentist)
                  }
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    backgroundColor: fav ? '#ef4444' : '#10b981',
                    color: '#fff',
                    marginTop: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  {fav ? '💔 Remover' : '⭐ Favoritar'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

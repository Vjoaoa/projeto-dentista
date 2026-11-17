import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalContext, type Dentist } from '../context/GlobalContext';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme, addFavorite, removeFavorite, isFavorite } =
    useContext(GlobalContext);
  const [dentist, setDentist] = useState<Dentist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca o utilizador/dentista específico pelo ID na API funcional
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Dentista não encontrado');
        return res.json();
      })
      .then((data) => {
        // Mapeia o retorno para a estrutura da tua aplicação
        const nameParts = data.name.split(' ');
        setDentist({
          matricula: String(data.id),
          nome: nameParts[0] || data.name,
          sobrenome: nameParts.slice(1).join(' ') || 'Silva',
          usuario: {
            username: data.username,
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar detalhes:', err);
        setDentist(null);
        setLoading(false);
      });
  }, [id]);

  const isDark = theme === 'dark';

  if (loading) {
    return (
      <div
        style={{
          padding: '30px',
          color: isDark ? '#ffffff' : '#0f172a',
          fontFamily: 'sans-serif',
        }}
      >
        <p>Carregando informações do dentista...</p>
      </div>
    );
  }

  if (!dentist) {
    return (
      <div
        style={{
          padding: '30px',
          color: isDark ? '#ffffff' : '#0f172a',
          fontFamily: 'sans-serif',
        }}
      >
        <p>Dentista não encontrado.</p>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '8px 12px', cursor: 'pointer' }}
        >
          ⬅️ Voltar para a Home
        </button>
      </div>
    );
  }

  const fav = isFavorite(dentist.matricula);

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
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: isDark ? '#334155' : '#e2e8f0',
          color: isDark ? '#ffffff' : '#0f172a',
          fontWeight: 'bold',
        }}
      >
        ⬅️ Voltar
      </button>

      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          padding: '30px',
          borderRadius: '12px',
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '15px' }}>👨‍⚕️</div>
        <h2 style={{ margin: '10px 0', color: isDark ? '#ffffff' : '#0f172a' }}>
          {dentist.nome} {dentist.sobrenome}
        </h2>
        <p
          style={{
            color: isDark ? '#38bdf8' : '#0284c7',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          Matrícula: {dentist.matricula}
        </p>

        <div
          style={{
            textAlign: 'left',
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: isDark ? '#0f172a' : '#f1f5f9',
            marginBottom: '20px',
          }}
        >
          <p style={{ margin: '8px 0' }}>
            <strong>Usuário:</strong> @{dentist.usuario?.username || 'N/A'}
          </p>
          <p style={{ margin: '8px 0' }}>
            <strong>E-mail:</strong>{' '}
            {dentist.usuario?.username
              ? `${dentist.usuario.username}@dhodonto.com`
              : 'contato@dhodonto.com'}
          </p>
        </div>

        <button
          onClick={() =>
            fav ? removeFavorite(dentist.matricula) : addFavorite(dentist)
          }
          style={{
            padding: '12px 20px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 'bold',
            fontSize: '1rem',
            backgroundColor: fav ? '#ef4444' : '#10b981',
            color: '#ffffff',
          }}
        >
          {fav ? '💔 Remover dos Favoritos' : '⭐ Adicionar aos Favoritos'}
        </button>
      </div>
    </div>
  );
}

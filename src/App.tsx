import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GlobalContext } from './context/GlobalContext';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Favs from './pages/Favs';
import Login from './pages/Login';

export default function App() {
  const { theme, toggleTheme, role, logout } = useContext(GlobalContext);
  const isDark = theme === 'dark';

  return (
    <Router>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 30px',
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: '1.5rem',
            color: isDark ? '#38bdf8' : '#0284c7',
          }}
        >
          DH Odonto
        </h1>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link
            to="/"
            style={{
              color: isDark ? '#ffffff' : '#0f172a',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Home
          </Link>

          {/* SÓ EXIBE FAVORITOS SE NÃO FOR DENTISTA */}
          {role !== 'DENTIST' && (
            <Link
              to="/favs"
              style={{
                color: isDark ? '#ffffff' : '#0f172a',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Favoritos
            </Link>
          )}

          {role ? (
            <button
              onClick={logout}
              style={{
                background: 'none',
                border: 'none',
                color: '#ef4444',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Sair ({role === 'DENTIST' ? 'Dentista' : 'Paciente'})
            </button>
          ) : (
            <Link
              to="/login"
              style={{
                color: isDark ? '#ffffff' : '#0f172a',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Login
            </Link>
          )}

          <button
            onClick={toggleTheme}
            style={{
              padding: '8px 14px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: isDark ? '#38bdf8' : '#0284c7',
              color: '#ffffff',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {isDark ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
          </button>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dentist/:id" element={<Detail />} />
          <Route path="/favs" element={<Favs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </Router>
  );
}

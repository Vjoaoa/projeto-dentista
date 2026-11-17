import { useContext, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext, type Role } from '../context/GlobalContext';

export default function Login() {
  const { theme, login } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('PATIENT');
  const [error, setError] = useState('');

  const isDark = theme === 'dark';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (username.trim().length < 3 || password.trim().length < 3) {
      setError('Por favor, preencha os campos corretamente.');
      return;
    }

    login(selectedRole);
    navigate('/');
  };

  return (
    <div
      style={{
        padding: '30px',
        minHeight: '100vh',
        backgroundColor: isDark ? '#0f172a' : '#f8fafc',
        color: isDark ? '#ffffff' : '#0f172a',
        fontFamily: 'sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '30px',
          borderRadius: '12px',
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            marginBottom: '20px',
            color: isDark ? '#ffffff' : '#0f172a',
          }}
        >
          Login - DH Odonto
        </h2>

        {error && (
          <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</p>
        )}

        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Entrar como:
          </label>
          <select
            value={selectedRole || 'PATIENT'}
            onChange={(e) => setSelectedRole(e.target.value as Role)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: isDark ? '1px solid #475569' : '1px solid #cbd5e1',
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
              color: isDark ? '#ffffff' : '#0f172a',
            }}
          >
            <option value="PATIENT">
              👤 Paciente (Ver Dentistas e Agendar)
            </option>
            <option value="DENTIST">
              👨‍⚕️ Dentista (Ver Minha Agenda / Pacientes)
            </option>
          </select>
        </div>

        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Usuário
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: isDark ? '1px solid #475569' : '1px solid #cbd5e1',
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
              color: isDark ? '#ffffff' : '#0f172a',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: isDark ? '1px solid #475569' : '1px solid #cbd5e1',
              backgroundColor: isDark ? '#0f172a' : '#ffffff',
              color: isDark ? '#ffffff' : '#0f172a',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: isDark ? '#38bdf8' : '#0284c7',
            color: '#ffffff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

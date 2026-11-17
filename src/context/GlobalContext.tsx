import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

export interface Dentist {
  matricula: string;
  nome: string;
  sobrenome: string;
  usuario?: {
    username: string;
  };
}

export type Role = 'PATIENT' | 'DENTIST' | null;

interface GlobalContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  favorites: Dentist[];
  addFavorite: (dentist: Dentist) => void;
  removeFavorite: (matricula: string) => void;
  isFavorite: (matricula: string) => boolean;
  role: Role;
  login: (selectedRole: Role) => void;
  logout: () => void;
}

export const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType
);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  const [favorites, setFavorites] = useState<Dentist[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Salva a Role logada ('PATIENT' ou 'DENTIST')
  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem('userRole') as Role) || null;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const addFavorite = (dentist: Dentist) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.matricula === dentist.matricula))
        return prev;
      return [...prev, dentist];
    });
  };

  const removeFavorite = (matricula: string) => {
    setFavorites((prev) => prev.filter((item) => item.matricula !== matricula));
  };

  const isFavorite = (matricula: string) => {
    return favorites.some((item) => item.matricula === matricula);
  };

  const login = (selectedRole: Role) => {
    setRole(selectedRole);
    if (selectedRole) localStorage.setItem('userRole', selectedRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('userRole');
  };

  return (
    <GlobalContext.Provider
      value={{
        theme,
        toggleTheme,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        role,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

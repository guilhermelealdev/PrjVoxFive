import { createContext, useContext, useState } from 'react';
import { authApi } from '../api/endpoints';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');
    return username ? { username, role } : null;
  });

  const login = async (username, password) => {
    const { data } = await authApi.login(username, password);
    sessionStorage.setItem('accessToken', data.accessToken);
    sessionStorage.setItem('refreshToken', data.refreshToken);

    const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
    const role = payload.role;

    sessionStorage.setItem('username', username);
    sessionStorage.setItem('role', role);
    setUsuario({ username, role });
  };

  const logout = () => {
    sessionStorage.clear();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, autenticado: usuario !== null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }
  return context;
}
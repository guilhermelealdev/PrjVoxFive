import { createContext, useContext, useState } from 'react';
import { authApi } from '../api/endpoints';

const AuthContext = createContext(null);

function decodeJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const token = sessionStorage.getItem('accessToken');
    if (!token) return null;
    
    const payload = decodeJwt(token);
    if (!payload) return null;
    
    return { username: payload.sub, role: payload.role, token };
  });

  const login = async (username, password) => {
    const { data } = await authApi.login(username, password);
    sessionStorage.setItem('accessToken', data.accessToken);
    sessionStorage.setItem('refreshToken', data.refreshToken);
    
    const payload = decodeJwt(data.accessToken);
    setUsuario({ username: payload.sub, role: payload.role, token: data.accessToken });
  };

  const logout = () => {
    sessionStorage.clear();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, autenticado: !!usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  return context;
}
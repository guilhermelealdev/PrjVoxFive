import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import RecuperarSenha from './pages/RecuperarSenha';
import Dashboard from './pages/Dashboard';
import Consultas from './pages/Consultas';
import Ocorrencias from './pages/MeusFeedbacks';
import NovaOcorrencia from './pages/NovoFeedback';
import Layout from './components/Layout';
import NovoAdmin from './pages/NovoAdmin';
import AuditLogs from './pages/AuditLogs';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/ocorrencias" element={<Ocorrencias />} />
              <Route path="/ocorrencias/nova" element={<NovaOcorrencia />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute roles={['ADMIN']} />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/consultas" element={<Consultas />} />
              <Route path="/admin/novo" element={<NovoAdmin />} />
              <Route path="/admin/feedbacks" element={<Ocorrencias />} />
              <Route path="/admin/audit-logs" element={<AuditLogs />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/ocorrencias" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
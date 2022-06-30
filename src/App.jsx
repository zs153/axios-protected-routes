import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, PrivateRoute, RequireAuth } from "./context/Auth";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import LoungePage from "./pages/Lounge";
import UsuarioPage from "./pages/Usuario";
import FraudePage from './pages/Fraude';
import UnauthorizedPage from "./pages/Unauthorized";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<PrivateRoute />}>
              <Route path="/lounge" element={<LoungePage />} />
              <Route path="/usuario" element={<UsuarioPage />} />
              <Route element={<RequireAuth />}>
                <Route path='/fraude' element={<FraudePage />} />
              </Route>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Route>  
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

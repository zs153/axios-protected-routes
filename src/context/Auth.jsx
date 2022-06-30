import { createContext, useContext, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const AuthContext = createContext(null);
const tiposRol = {
  usuario: 1,
  responsable: 2,
  admin: 3,
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (parseInt(user.rol) !== tiposRol.admin) {
    return (
      <Navigate
        to={{ pathname: "/unauthorized", state: { from: location } }}
        replace
      />
    );
  }

  return <Outlet />;
};

export const PrivateRoute = () => {
  const { user } = useAuth();
  
  return (
    user ? <Outlet /> : <Navigate to='/login' />
  )
}
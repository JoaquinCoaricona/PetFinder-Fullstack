import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoutes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h1>Cargando...</h1>;

  if (!loading && !user) return <Navigate to="/login" replace />;
  
  return <Outlet />;
}

export default ProtectedRoutes;
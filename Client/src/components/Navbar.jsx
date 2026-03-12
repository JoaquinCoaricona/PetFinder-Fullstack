import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <Link
        to="/"
        className="text-2xl font-black text-emerald-600 tracking-tighter"
      >
        Pet<span className="text-stone-800">Finder</span>
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-stone-500 font-medium">
              Hola,
              <strong> </strong>
              <Link to="/profile">
                <strong className="text-emerald-800">
                  {user.username || "Usuario Prueba"}
                </strong>
              </Link>
            </span>
            <button
              onClick={logout}
              className="text-sm text-red-500 font-bold 
              hover:cursor-pointer
              hover:text-red-700 transition-colors bg-red-50 px-3 py-1.5 rounded-lg"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <Link
              to="/login"
              className="text-stone-600 font-bold hover:text-emerald-600 px-3 py-2"
            >
              Ingresar
            </Link>
            <Link
              to="/register"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-700 transition-colors"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-stone-200 px-5 sm:px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm w-full box-border">
      <Link
        to="/"
        className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tighter shrink-0"
      >
        Pet<span className="text-stone-800">Finder</span>
      </Link>

      <div className="flex justify-end items-center">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-stone-500 font-medium text-sm flex items-center gap-1">
              <span className="hidden sm:inline">Hola, </span>
              <Link to="/profile" className="truncate max-w-[100px] sm:max-w-none inline-block align-bottom">
                <strong className="text-emerald-800 hover:text-emerald-600 transition-colors">
                  {user.username || "Usuario"}
                </strong>
              </Link>
            </span>
            <button
              onClick={logout}
              className="text-xs sm:text-sm text-red-500 font-bold 
              hover:cursor-pointer hover:text-red-700 transition-colors bg-red-50 px-3 py-1.5 rounded-lg shrink-0"
            >
              <span className="hidden sm:inline">Cerrar Sesión</span>
              <span className="sm:hidden">Salir</span>
            </button>
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-4 items-center">
            <Link
              to="/login"
              className="text-sm sm:text-base text-stone-600 font-bold hover:text-emerald-600"
            >
              Ingresar
            </Link>
            <Link
              to="/register"
              className="text-sm sm:text-base bg-emerald-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold hover:bg-emerald-700 transition-colors shrink-0"
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
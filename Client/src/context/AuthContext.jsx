import React, { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import { loginRequest, registerRequest, logoutRequest,verifyTokenRequest } from "../api/auth";
import { useEffect } from "react";
import toast from 'react-hot-toast';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [erroresRegistro, setErroresRegistro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await verifyTokenRequest();
      
        if (res.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (error) {

        setUser(null);
      } finally {

        setLoading(false); 
      }
    }

    checkLogin();
  }, []);

  const login = async (datosDelFormulario) => {
    try {
      const respuesta = await loginRequest(datosDelFormulario);

      setUser(respuesta.data);
      setErroresRegistro(null);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response.data.message);

      setErroresRegistro(error.response?.data?.message || "Datos Incorrectos");
    }
  };

  const signup = async (datos) => {
    try {
      const respuesta = await registerRequest(datos);

      setUser(respuesta.data);
    } catch (error) {
      console.error(
        "Error al registrarse:",
        error.response?.data || error.message,
      );

      setErroresRegistro(error.response?.data?.message || "Email Invalido");
    }
  };

const logout = async () => {
    const toastId = toast.loading("Cerrando sesión...");
    try {
      await logoutRequest();
      setUser(null);
      toast.success("Sesion Cerrada con Exito", { id: toastId });
    } catch (error) {
      console.error("Error al cerrar sesión", error);
      toast.error("Hubo un error al intentar salir.", { id: toastId });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup, erroresRegistro,loading,setLoading}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

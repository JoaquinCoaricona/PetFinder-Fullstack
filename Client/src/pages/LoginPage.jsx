import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";


function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, user, erroresRegistro } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
  }, [user, navigate]);

  const onSubmit = (data) => {
    login(data);
  };

  if (user) {
    return <Navigate to="/feed" replace />;
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&q=80&w=800"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Perro Login"
        />
      </div>

      <div className="flex items-center justify-center px-8 sm:px-16 bg-white">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-black text-emerald-950 mb-2">
            ¡Qué bueno verte de nuevo!
          </h2>

          <p className="text-stone-500 mb-8">
            La comunidad te extrañaba. Ingresá para seguir uniendo familias.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <Input
              textLabel="Email"
              tipo="email"
              {...register("email", {
                required: "El correo es obligatorio",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-bold">
                {errors.email.message}
              </p>
            )}

            <Input
              textLabel="Contraseña"
              tipo="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs font-bold">
                {errors.password.message}
              </p>
            )}

            <Button>Iniciar Sesion</Button>

            {erroresRegistro && (
              <div className="bg-red-100 text-red-600 p-3 rounded-xl text-center font-bold text-sm">
                {erroresRegistro}
              </div>
            )}

            <p className="text-center text-sm text-stone-500 mt-2">
              ¿No tenes cuenta?{" "}
              <Link
                to="/register"
                className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-all"
              >
                Registrate acá
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

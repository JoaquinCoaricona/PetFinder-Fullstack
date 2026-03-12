import React from "react";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function HomePage() {
  const fotosCarrusel = [
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800",
  ];

  const [indiceFoto, setIndiceFoto] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceFoto((indiceActual) =>
        indiceActual === fotosCarrusel.length - 1 ? 0 : indiceActual + 1,
      );
    }, 3000);

  
    return () => clearInterval(intervalo);
  }, []);
  
  return (
    // contendor Principal
    <div className="min-h-screen bg-stone-50 relative overflow-hidden">
      {/* Luces En las diagonales, primero la der y despies izq*/}
      <div
        className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] 
        rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none"
      ></div>

      <div
        className="absolute -bottom-[10%] -left-[5%] w-[600px] h-[600px] 
          rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none"
      ></div>

  {/*--------------------------------------------------------------------*/}

      <div className=" relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
      
          <div className="flex flex-col justify-center items-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 text-emerald-700 font-bold text-sm mb-6">
              <span>Red de Búsqueda Activa</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-emerald-950 mb-6 tracking-tight leading-[1.05]">
              Ayudalos A
              <br />
              <span className=" text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500">
                Volver A Casa
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-stone-500 mb-10 font-medium max-w-lg">
              PetFinder es la comunidad más grande para reportar mascotas perdidas y conectar con personas que pueden haberlas visto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link to="/createPost" >
              <Button>Reportar Mascota
              </Button>
              </Link>

              <Link to="/feed" >
              <Button tipo="secundario">Ver Publicaciones</Button>
              </Link>
            </div>

          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-lg flex justify-center lg:justify-end">             
  
            <div className="relative w-full aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white">
              {fotosCarrusel.map((foto, index) => (
                <img
                  key={index}
                  src={foto}
                  alt={`Mascota`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out
                    ${index === indiceFoto ? "opacity-100" : "opacity-0"}
                  `}
                />
              ))}

              <div className="absolute inset-0 bg-linear-to-t from-stone-900/30 to-transparent pointer-events-none" />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getPostRequest, updatePostRequest } from "../api/auth"; 
import Navbar from "../components/Navbar";
import toast from 'react-hot-toast';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [direccionBuscada, setDireccionBuscada] = useState("");
  const [datosUbicacion, setDatosUbicacion] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [errorMapa, setErrorMapa] = useState("");

  useEffect(() => {
    async function cargarPost() {
      try {
        const res = await getPostRequest(id);
        const post = res.data;

        setValue("title", post.title);
        setValue("description", post.description);
        setValue("category", post.category);

        if (post.location && post.location.coordinates) {
          setDatosUbicacion({
            lng: post.location.coordinates[0],
            lat: post.location.coordinates[1],
            barrio: post.barrio
          });
        }
      } catch (error) {
        console.error("Error al cargar para editar", error);
      } finally {
        setCargando(false);
      }
    }
    cargarPost();
  }, [id, setValue]);

  const buscarEnMapa = async (e) => {
    e.preventDefault();
    if (!direccionBuscada) return;
    setBuscando(true);
    setErrorMapa("");

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${direccionBuscada}&addressdetails=1&limit=1`);
      const data = await res.json();

      if (data.length > 0) {
        const result = data[0];
        const address = result.address;
        const barrioEncontrado = address.suburb || address.neighbourhood || address.city_district || address.town || address.city || "Barrio Desconocido";

        setDatosUbicacion({
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          barrio: barrioEncontrado,
        });
      } else {
        setErrorMapa("No se encontró la dirección.");
      }
    } catch (error) {
      setErrorMapa("Error con el mapa.");
    } finally {
      setBuscando(false);
    }
  };

  const onSubmit = async (data) => {
    setGuardando(true);
    const toastId = toast.loading('Guardando cambios...');
    
    const postActualizado = {
      title: data.title,
      description: data.description,
      category: data.category,
      barrio: datosUbicacion?.barrio || "Desconocido",
      lat: datosUbicacion.lat,
      lng: datosUbicacion.lng  
    };

    try {
      await updatePostRequest(id, postActualizado);
      toast.success('¡Publicación actualizada con éxito!', { id: toastId });
      navigate("/profile");
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast.error('Hubo un error al guardar los cambios.', { id: toastId });
      setGuardando(false);
    }
  };

  if (cargando) return <div className="text-center py-20 animate-pulse font-bold text-stone-500">Cargando publicación...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 py-10 px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
          <h1 className="text-3xl font-black text-emerald-950 mb-6">Editar Publicación</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
            <div>
              <label className="block text-sm font-bold text-stone-600 mb-2">Título</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200"
                {...register("title", { required: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-600 mb-2">Estado</label>
              <select 
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200"
                {...register("category")}
              >
                <option value="Lost">Perdido</option>
                <option value="Found">Encontrado</option>
                <option value="Adoption">En Adopción</option>
              </select>
            </div>

            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <label className="block text-sm font-bold text-emerald-800 mb-2">Cambiar Ubicación</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-emerald-200"
                  placeholder="Ej: Nueva dirección..."
                  value={direccionBuscada}
                  onChange={(e) => setDireccionBuscada(e.target.value)}
                />
                <button onClick={buscarEnMapa} disabled={buscando} className="bg-emerald-600 text-white px-4 rounded-xl font-bold">
                  {buscando ? "..." : "Buscar"}
                </button>
              </div>
              {errorMapa && <p className="text-red-500 text-xs font-bold">{errorMapa}</p>}
              {datosUbicacion && (
                <p className="text-sm text-emerald-800 font-medium">📍 Ubicación actual: {datosUbicacion.barrio}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-600 mb-2">Descripción</label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200"
                {...register("description", { required: true })}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={guardando}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all 
                ${guardando ? 'bg-stone-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {guardando ? 'Guardando cambios...' : 'Guardar Cambios'}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default EditPostPage;
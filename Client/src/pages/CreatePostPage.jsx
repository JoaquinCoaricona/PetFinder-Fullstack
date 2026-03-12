import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createPostRequest } from "../api/auth";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import toast from "react-hot-toast";

function CreatePostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [archivosImagenes, setArchivosImagenes] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [direccionBuscada, setDireccionBuscada] = useState("");
  const [datosUbicacion, setDatosUbicacion] = useState(null);
  const [errorMapa, setErrorMapa] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const archivosValidos = files.filter((file) => file.type.startsWith("image/"));

    if (archivosValidos.length !== files.length) {
      toast.error("Por favor subi unicamente archivos de imagen");
      e.target.value = ""; 
      setArchivosImagenes([]);
      setPreviews([]);
      return; 
    }

    setArchivosImagenes(archivosValidos);

    const urlsTemporales = archivosValidos.map((file) => URL.createObjectURL(file));
    setPreviews(urlsTemporales);
  };

  const buscarEnMapa = async (e) => {
    e.preventDefault();
    if (!direccionBuscada) return;

    setBuscando(true);
    setErrorMapa("");

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${direccionBuscada}&addressdetails=1&limit=1`,
      );
      const data = await res.json();

      if (data.length > 0) {
        const resultado = data[0];

        const address = resultado.address;
        const barrioEncontrado =
          address.suburb ||
          address.neighbourhood ||
          address.city_district ||
          address.town ||
          address.city ||
          "Barrio Desconocido";

        setDatosUbicacion({
          lat: parseFloat(resultado.lat),
          lng: parseFloat(resultado.lon),
          barrio: barrioEncontrado,
        });
      } else {
        setErrorMapa("No se encontro la direccion. Proba agregando la ciudad.");
        setDatosUbicacion(null);
      }
    } catch (error) {
      setErrorMapa("Error al conectar con el mapa.");
    } finally {
      setBuscando(false);
    }
  };

  const onSubmit = async (data) => {
    if (!datosUbicacion) {
      setErrorMapa("Tenes que buscar y confirmar una ubicacion primero");
      toast.error("Falta confirmar la ubicacion en el mapa");
      return;
    }

    if (archivosImagenes.length === 0) {
      toast.error("Tenes que subir al menos una foto de la mascota");
      return;
    }

    setGuardando(true);
    const toastId = toast.loading("Subiendo fotos y publicando....");

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("barrio", datosUbicacion.barrio);

    formData.append("lat", datosUbicacion.lat);
    formData.append("lng", datosUbicacion.lng);

    archivosImagenes.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await createPostRequest(formData);
      toast.success("Mascota publicada con éxito!", { id: toastId });
      navigate("/feed");
    } catch (error) {
      console.error(
        "Error al crear post:",
        error.response?.data || error.message,
      );
      toast.error("Error al publicar. Revisá los datos.", { id: toastId });
      setGuardando(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 py-10 px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
          <h1 className="text-3xl font-black text-emerald-950 mb-6">
            Crear Publicación
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div>
              <label className="block text-sm font-bold text-stone-600 mb-2">
                Título
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200"
                placeholder="Ej: Ovejero Alemán encontrado"
                {...register("title", { required: true, minLength: 5 })}
              />
              {errors.title && (
                <span className="text-red-500 text-xs">
                  Mínimo 5 caracteres
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-600 mb-2">
                Categoría
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200"
                {...register("category", { required: true })}
              >
                <option value="Lost">Perdido</option>
                <option value="Found">Encontrado</option>
                <option value="Adoption">En Adopción</option>
              </select>
            </div>

            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <label className="block text-sm font-bold text-emerald-800 mb-2">
                Ubicación
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-emerald-200"
                  placeholder="Ej: Av. Corrientes 1300, CABA"
                  value={direccionBuscada}
                  onChange={(e) => setDireccionBuscada(e.target.value)}
                />
                <button
                  onClick={buscarEnMapa}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700"
                  disabled={buscando}
                >
                  {buscando ? "..." : "Buscar"}
                </button>
              </div>

              {errorMapa && (
                <p className="text-red-500 text-sm mt-2 font-bold">
                  {errorMapa}
                </p>
              )}

              {datosUbicacion && (
                <div className="mt-4 p-3 bg-white rounded-xl border border-emerald-200 text-sm text-emerald-800 font-medium">
                  ✅ Ubicación confirmada: <br />
                  <strong>Barrio:</strong> {datosUbicacion.barrio} <br />
                  <span className="text-xs text-stone-400">
                    GPS: {datosUbicacion.lat}, {datosUbicacion.lng}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-600 mb-2">
                Descripción
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200"
                placeholder="Detalles sobre la mascota..."
                {...register("description", { required: true })}
              ></textarea>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200">
              <label className="block text-sm font-bold text-stone-600 mb-2">
                Fotos de la mascota
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-stone-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-emerald-50 file:text-emerald-700
                  hover:file:bg-emerald-100 mb-4 cursor-pointer"
              />

              {previews.length > 0 && (
                <div className="flex gap-4 overflow-x-auto py-2">
                  {previews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 border-emerald-100 shadow-sm"
                    >
                      <img
                        src={preview}
                        alt={`Vista previa ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              {previews.length === 0 && (
                <p className="text-xs text-stone-400 italic">
                  Podés seleccionar varias fotos a la vez.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={guardando}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all 
      ${guardando ? "bg-stone-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"}`}
            >
              {guardando
                ? "Subiendo fotos y publicando..."
                : "Publicar Mascota"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePostPage;
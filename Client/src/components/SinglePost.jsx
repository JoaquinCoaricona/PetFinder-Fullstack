import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostRequest, getCommentsRequest, createCommentRequest } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import toast from 'react-hot-toast';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

function PostDetailPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [indiceImagen, setIndiceImagen] = useState(0);

  useEffect(() => {
    async function cargarDatos() { 
      try {
        const resPost = await getPostRequest(id);
        const resComentarios = await getCommentsRequest(id);
        
        setPost(resPost.data);
        setComentarios(resComentarios.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setCargando(false);
      }
    }
    cargarDatos();
  }, [id]);

  const handleComentar = async (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    setEnviando(true);
    const toastId = toast.loading("Enviando comentario...");
    
    try {
      await createCommentRequest({ content: nuevoComentario, postId: id });
      setNuevoComentario("");
      const resComentarios = await getCommentsRequest(id);
      setComentarios(resComentarios.data);
      toast.success("¡Comentario publicado!", { id: toastId });
    } catch (error) {
      console.error("Error al enviar comentario", error);
      toast.error("Error al enviar el comentario.", { id: toastId });
    } finally {
      setEnviando(false);
    }
  };

  const fotoAnterior = () => {
    setIndiceImagen((prev) => (prev === 0 ? post.images.length - 1 : prev - 1));
  };

  const fotoSiguiente = () => {
    setIndiceImagen((prev) => (prev === post.images.length - 1 ? 0 : prev + 1));
  };

  if (cargando) return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      <div className="flex grow items-center justify-center text-stone-400 font-bold animate-pulse text-xl">Cargando detalles...</div>
    </div>
  );
  
  if (!post) return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      <div className=" flex grow flex-col items-center justify-center">
        <h1 className="text-3xl font-black text-stone-700 mb-4">Publicación no encontrada</h1>
        <Link to="/feed" className="text-emerald-600 font-bold hover:underline">Volver al Feed</Link>
      </div>
    </div>
  );

  const traduccionEstados = {
    Lost: "Perdido",
    Found: "Encontrado",
    Adoption: "Adopción",
  };
  const estadoEnEspanol = traduccionEstados[post.category] || "Desconocido";

  const lng = post.location?.coordinates[0];
  const lat = post.location?.coordinates[1];
  const tieneUbicacion = lat !== undefined && lng !== undefined;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 py-10 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
          
          <div className="w-full h-80 sm:h-[450px] relative bg-stone-100 overflow-hidden group">
            {post.images && post.images.length > 0 ? (
              <>
                <img 
                  src={post.images[indiceImagen].url} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-all duration-300" 
                />
                
                {post.images.length > 1 && (
                  <>
                    <button 
                      onClick={fotoAnterior}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                      &#10094;
                    </button>
                    <button 
                      onClick={fotoSiguiente}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                      &#10095;
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {post.images.map((img, idx) => (
                        <div 
                          key={img.public_id || idx} 
                          className={`w-2.5 h-2.5 rounded-full transition-all shadow-sm
                            ${idx === indiceImagen ? 'bg-white scale-125' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400 font-medium">
                Esta publicación no tiene foto
              </div>
            )}
            <span className={`absolute top-6 left-6 px-4 py-2 rounded-full text-sm font-black text-white shadow-md
              ${post.category === 'Lost' ? 'bg-red-500' : post.category === 'Found' ? 'bg-emerald-500' : 'bg-purple-500'}
            `}>
              {estadoEnEspanol}
            </span>
          </div>

          <div className="p-8 sm:p-12 flex flex-col gap-8">
            <div>
              <h1 className="text-4xl font-black text-emerald-950 mb-3 capitalize">{post.title}</h1>
              <div className="flex items-center gap-2 text-stone-500 font-medium bg-stone-100 w-fit px-4 py-2 rounded-xl mb-6">
                <span>📍</span>
                <span>{post.barrio || "Ubicación desconocida"}</span>
              </div>
              
              <div className="flex items-center gap-3 pt-6 border-t border-stone-100">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-xl shadow-sm">
                  {post.user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Publicado por</p>
                  <p className="font-bold text-emerald-950 text-lg">{post.user?.username || "Usuario"}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-3">Descripción</h3>
              <p className="text-stone-600 leading-relaxed whitespace-pre-wrap text-lg">
                {post.description}
              </p>
            </div>

            {tieneUbicacion && (
              <div className="mt-4">
                <h3 className="text-xl font-bold text-stone-800 mb-3">Última ubicación registrada</h3>
                <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-stone-200 z-0 relative">
                  <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[lat, lng]}>
                      <Popup>
                        <strong className="text-emerald-700">Zona aproximada:</strong> <br/> {post.barrio}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-stone-200">
              <h3 className="text-2xl font-black text-stone-800 mb-6">Comentarios ({comentarios.length})</h3>

              <div className="flex flex-col gap-4 mb-8">
                {comentarios.length === 0 ? (
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 text-center">
                    <p className="text-stone-500 font-medium">Nadie comentó todavía. ¡Aportá información si viste a la mascota!</p>
                  </div>
                ) : (
                  comentarios.map((comentario) => (
                    <div key={comentario._id} className="bg-stone-50 p-5 rounded-2xl border border-stone-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-lg shadow-sm">
                          {comentario.user?.username?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-emerald-950">
                            {comentario.user?.username || "Usuario"}
                          </span>
                          <span className="text-xs text-stone-400 font-medium">
                            {new Date(comentario.createdAt).toLocaleDateString()} a las {new Date(comentario.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                      </div>
                      <p className="text-stone-700 leading-relaxed pl-13">{comentario.content}</p>
                    </div>
                  ))
                )}
              </div>
              
              {user ? (
                <form onSubmit={handleComentar} className="flex flex-col gap-3 bg-white border border-stone-200 p-4 rounded-2xl focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50 transition-all">
                  <textarea
                    rows="3"
                    className="w-full resize-none outline-none text-stone-700 placeholder:text-stone-400"
                    placeholder="Escribí un comentario..."
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end pt-2 border-t border-stone-100">
                    <button
                      type="submit"
                      disabled={enviando || !nuevoComentario.trim()}
                      className={`px-6 py-2 rounded-xl font-bold text-white transition-all 
                        ${enviando || !nuevoComentario.trim() ? 'bg-stone-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-sm'}`}
                    >
                      {enviando ? "Enviando..." : "Comentar"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-orange-50 p-6 rounded-2xl text-center border border-orange-100">
                  <p className="text-orange-800 font-medium">
                    Tenés que <Link to="/login" className="font-bold underline hover:text-orange-900">iniciar sesión</Link> para dejar un comentario.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetailPage;
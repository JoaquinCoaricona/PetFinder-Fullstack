import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getPostsRequest, deletePostRequest } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import toast from 'react-hot-toast';

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [misPosts, setMisPosts] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarMisPosts() {
      try {
        const res = await getPostsRequest();
        const idUsuario = user.id || user._id; 
        const publicacionesFiltradas = res.data.filter(post => post.user === idUsuario);
        setMisPosts(publicacionesFiltradas);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    if (user) {
      cargarMisPosts();
    }
  }, [user]);

  const handleDelete = async (idPost) => {
    const confirmacion = window.confirm("¿Estás seguro que querés borrar esta publicación? Esta acción no se puede deshacer.");
    if (confirmacion) {
      const toastId = toast.loading('Borrando publicación...');
      try {
        await deletePostRequest(idPost);
        setMisPosts(misPosts.filter(post => post._id !== idPost));
        toast.success('¡Publicación eliminada correctamente!', { id: toastId });
      } catch (error) {
        console.error(error);
        toast.error('Hubo un error al intentar borrar.', { id: toastId });
      }
    }
  };

  if (cargando) return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      <div className="flex grow items-center justify-center text-stone-400 font-bold animate-pulse text-xl">
        Cargando tu perfil...
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 py-10 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 mb-8 flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-4xl shadow-sm">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-3xl font-black text-emerald-950">¡Hola, {user?.username}!</h1>
              <p className="text-stone-500 font-medium mt-1">Acá podés gestionar todas tus publicaciones.</p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-stone-800 mb-6">Mis Reportes ({misPosts.length})</h2>

          {misPosts.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-dashed border-stone-300 text-center">
              <p className="text-stone-500 text-lg mb-4">Todavía no publicaste ninguna mascota.</p>
              <Link to="/createPost" className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors inline-block">
                Crear mi primera publicación
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {misPosts.map((post) => (
                <div key={post._id} className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  
                  <Link to={`/post/${post._id}`} className="block h-48 bg-stone-100 relative group cursor-pointer">
                    {post.images && post.images.length > 0 ? (
                      <img src={post.images[0].url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400 font-medium">Sin foto</div>
                    )}
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black text-white shadow-sm backdrop-blur-sm z-10
                      ${post.category === 'Lost' ? 'bg-red-500' : post.category === 'Found' ? 'bg-emerald-500' : 'bg-purple-500'}
                    `}>
                      {post.category === 'Lost' ? 'Perdido' : post.category === 'Found' ? 'Encontrado' : 'Adopción'}
                    </span>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-0"></div>
                  </Link>

                  <div className="p-6 flex flex-col grow">
                    <Link to={`/post/${post._id}`}>
                      <h3 className="text-xl font-black text-emerald-950 mb-2 truncate hover:text-emerald-700 transition-colors">{post.title}</h3>
                    </Link>
                    
                    <p className="text-stone-500 text-sm mb-4">📍 {post.barrio}</p>
                    
                    <div className="mt-auto flex gap-3 pt-4 border-t border-stone-100">
                      <Link 
                        to={`/editPost/${post._id}`}
                        className="flex-1 bg-blue-50 text-blue-700 text-center py-2 rounded-xl font-bold hover:bg-blue-100 transition-colors"
                      >
                        Editar
                      </Link>
                      <button 
                        onClick={(e) => { e.preventDefault(); handleDelete(post._id); }}
                        className="flex-1 bg-red-50 text-red-700 py-2 rounded-xl font-bold hover:bg-red-100 hover:cursor-pointer transition-colors"
                      >
                        Borrar
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default ProfilePage;
import React, { useState } from "react";
import Post from "../components/Post";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getPostsRequest } from "../api/auth";

function FeedPage() {
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [posts, setPosts] = useState([]);

  const { loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await getPostsRequest();
        setPosts(res.data);
      } catch (error) {
        console.error("Error al cargar las publicaciones:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const postsFiltrados = posts.filter((post) => {
    if (filtroActivo === "Todos") return true;

    const categoriasAPI = {
      Perdido: "Lost",
      Encontrado: "Found",
      Adopción: "Adoption",
    };

    return post.category === categoriasAPI[filtroActivo];
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 pt-10 px-4 sm:px-12 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl font-black text-emerald-950 mb-4 tracking-tight">
              Publicaciones en la <span className="text-teal-500">Zona</span>
            </h2>
            <p className="text-stone-500 text-lg font-medium px-2">
              Revisá los últimos reportes y ayudanos a que vuelvan a casa.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 w-full">
            <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start bg-white p-1 rounded-xl shadow-sm border border-stone-200 w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setFiltroActivo("Todos")}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap
                hover:cursor-pointer
                ${filtroActivo === "Todos" ? "bg-emerald-100 text-emerald-800" : "text-stone-500 hover:bg-stone-50"}`}
              >
                Todos
              </button>
              <button
                onClick={() => setFiltroActivo("Perdido")}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap
                hover:cursor-pointer
                transition-all ${filtroActivo === "Perdido" ? "bg-red-100 text-red-800" : "text-stone-500 hover:bg-stone-50"}`}
              >
                Perdidos
              </button>
              <button
                onClick={() => setFiltroActivo("Encontrado")}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap
                hover:cursor-pointer
                transition-all ${filtroActivo === "Encontrado" ? "bg-teal-100 text-teal-800" : "text-stone-500 hover:bg-stone-50"}`}
              >
                Encontrados
              </button>
              <button
                onClick={() => setFiltroActivo("Adopción")}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold hover:cursor-pointer transition-all whitespace-nowrap
                ${filtroActivo === "Adopción" ? "bg-purple-100 text-purple-800" : "text-stone-500 hover:bg-stone-50"}`}
              >
                Adopción
              </button>
            </div>

            <div className="w-full sm:w-auto text-center sm:text-right shrink-0">
              <Link to="/createPost">
                <Button>+ Nueva Publicación</Button>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-stone-400 font-bold animate-pulse">
              Buscando mascotas...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {postsFiltrados.map((post) => {
                const imagenMostrar =
                  post.images && post.images.length > 0
                    ? post.images[0].url
                    : "https://via.placeholder.com/400x300?text=Sin+Foto";

                const traduccionEstados = {
                  Lost: "Perdido",
                  Found: "Encontrado",
                  Adoption: "Adopción",
                };
                const estadoEnEspanol =
                  traduccionEstados[post.category] || "Desconocido";

                return (
                  <Link key={post._id} to={`/post/${post._id}`} className="w-full">
                    <Post
                      id={post._id}
                      imagen={imagenMostrar}
                      nombre={post.title}
                      descripcion={post.description}
                      estado={estadoEnEspanol}
                      ubicacion={post.barrio || "Ubicación desconocida"}
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {!loading && posts.length === 0 && (
        <div className="text-center py-20 mx-4 sm:mx-12 mb-10 bg-white rounded-3xl border border-dashed border-stone-300">
          <p className="text-stone-400">
            No hay publicaciones todavía. Se el primero en reportar!
          </p>
        </div>
      )}
    </>
  );
}

export default FeedPage;
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
      <div className="min-h-screen bg-stone-50 pt-10 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl font-black text-emerald-950 mb-4 tracking-tight">
              Publicaciones en la <span className="text-teal-500">Zona</span>
            </h2>
            <p className="text-stone-500 text-lg font-medium">
              Revisá los últimos reportes y ayudanos a que vuelvan a casa.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-stone-200 h-12">
              <button
                onClick={() => setFiltroActivo("Todos")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all 
                hover:cursor-pointer
                ${filtroActivo === "Todos" ? "bg-emerald-100 text-emerald-800" : "text-stone-500 hover:bg-stone-50"}`}
              >
                Todos
              </button>
              <button
                onClick={() => setFiltroActivo("Perdido")}
                className={`px-4 py-2 rounded-lg text-sm font-bold 
                hover:cursor-pointer
                transition-all ${filtroActivo === "Perdido" ? "bg-red-100 text-red-800" : "text-stone-500 hover:bg-stone-50"}`}
              >
                Perdidos
              </button>
              <button
                onClick={() => setFiltroActivo("Encontrado")}
                className={`px-4 py-2 rounded-lg text-sm font-bold 
                hover:cursor-pointer
                transition-all ${filtroActivo === "Encontrado" ? "bg-teal-100 text-teal-800" : "text-stone-500 hover:bg-stone-50"}`}
              >
                Encontrados
              </button>

              <button
                onClick={() => setFiltroActivo("Adopción")}
                className={`px-4 py-2 rounded-lg text-sm font-bold hover:cursor-pointer transition-all 
                ${filtroActivo === "Adopción" ? "bg-purple-100 text-purple-800" : "text-stone-500 hover:bg-stone-50"}`}
              >
                Adopción
              </button>
            </div>

            <Link to="/createPost">
              <Button>+ Nueva Publicación</Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-20 text-stone-400 font-bold animate-pulse">
              Buscando mascotas...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <Link key={post._id} to={`/post/${post._id}`}>
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
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300">
          <p className="text-stone-400">
            No hay publicaciones todavía. ¡Sé el primero en reportar!
          </p>
        </div>
      )}
    </>
  );
}

export default FeedPage;

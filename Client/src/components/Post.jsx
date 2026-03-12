import React from 'react';

function Post({ id, imagen, nombre, descripcion, estado, ubicacion }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border-8 border-stone-100 flex flex-col h-full hover:cursor-pointer">
      
      <div className="relative w-full h-56 sm:h-64 shrink-0">
        <img 
          src={imagen} 
          alt={`Mascota`} 
          className="w-full h-full object-cover"
        />
    
        <span 
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm text-white
            ${estado === 'Perdido' ? 'bg-red-500' : estado === 'Encontrado' ? 'bg-emerald-500' : 'bg-purple-500'}
          `}
        >
          {estado}
        </span>
      </div>

      <div className="p-6 flex flex-col gap-2 grow">
        <h2 className="text-2xl font-black text-emerald-950 capitalize">
          {nombre}
        </h2>

        <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">
          {descripcion}
        </p>

        <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold text-emerald-700 w-fit rounded-lg">
          <span>📍</span>
          <span className="bg-emerald-50 px-3 py-1.5 rounded-lg">{ubicacion}</span>
        </div>
      </div>
      
    </div>
  );
}

export default Post;
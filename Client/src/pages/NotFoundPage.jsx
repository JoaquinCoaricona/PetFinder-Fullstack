import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function NotFoundPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6">
        <h1 className="text-9xl font-black text-emerald-900 opacity-10 tracking-tighter">404</h1>
        <h2 className="text-3xl font-black text-stone-800 mt-4 text-center">¡Ups! Nos perdimos...</h2>
        <p className="text-stone-500 mt-2 mb-8 text-center max-w-md">
          La página que estás buscando no existe o fue movida a otro lugar.
        </p>
        <Link 
          to="/feed" 
          className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-sm"
        >
          Volver al inicio
        </Link>
      </div>
    </>
  );
}

export default NotFoundPage;
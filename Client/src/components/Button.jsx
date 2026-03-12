import React from "react";

function Button({ tipo, children }) {
  const estiloPrincipal =
    "px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/20 active:scale-95 cursor-pointer";
  const estiloSecundario =
    "px-8 py-3 bg-white hover:bg-stone-50 text-emerald-950 border-2 border-stone-200 rounded-2xl font-bold transition-all cursor-pointer";

  let estiloAplicado = estiloPrincipal;

  if (tipo === "secundario") {
    estiloAplicado = estiloSecundario;
  }

  return (
    <button type="submit" className={estiloAplicado}>
      {children}
    </button>
  );
}

export default Button;

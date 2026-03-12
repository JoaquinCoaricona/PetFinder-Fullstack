import React, { forwardRef } from "react";

const Input = forwardRef(({ textLabel, tipo, ...props }, ref) => {
  return (
    <div>
      <label className="block text-sm font-bold text-stone-700 mb-1.5">
        {textLabel}
      </label>

      <input
        type={tipo}
        ref={ref}
        {...props}
        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50
         text-stone-900 focus:bg-white focus:outline-none focus:ring-2
          focus:ring-emerald-500/50 transition-all"
      />
    </div>
  );
});

export default Input;

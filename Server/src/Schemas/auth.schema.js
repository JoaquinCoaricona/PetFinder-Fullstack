import { z } from "zod";

export const registerSchema = z.object({

    
  username: z.string({ required_error: "El nombre de usuario es requerido" })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),

  email: z.string({ required_error: "El email es requerido" })
    .email({ message: "Email inválido" }),


  password: z.string({ required_error: "La contraseña es requerida" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),

  password: z.string().min(1, { message: "La contraseña es requerida" }),
  
});
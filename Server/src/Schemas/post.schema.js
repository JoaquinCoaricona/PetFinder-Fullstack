import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string({ required_error: "El título es requerido" })
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(100),
  
  description: z
    .string({ required_error: "La descripción es requerida" }),
  
  category: z.enum(["Lost", "Found", "Adoption"], {
    error_map: () => ({ message: "Categoría no válida" }),
  }),
  
  barrio: z
    .string({ required_error: "El barrio es requerido" }),

  lat: z.coerce.number({ required_error: "Falta la latitud" }),
  lng: z.coerce.number({ required_error: "Falta la longitud" }),
});
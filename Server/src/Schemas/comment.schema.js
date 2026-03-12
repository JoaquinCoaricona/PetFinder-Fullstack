import { z } from "zod";

export const createCommentSchema = z.object({
  content: z
    .string({ required_error: "El comentario no puede estar vacío" })
    .max(4000),
  postId: z
    .string({ required_error: "El ID del post es obligatorio" })
});
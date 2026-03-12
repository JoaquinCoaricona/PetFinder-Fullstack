import express from "express";
import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../Controllers/auth.controller.js";
import { authRequired } from "../Middlewares/validateToken.js";
import {validateSchema} from "../Middlewares/validator.js"
import {registerSchema, loginSchema} from "../Schemas/auth.schema.js"


const router = Router();

router.post("/register", validateSchema(registerSchema),register);
router.post("/login", validateSchema(loginSchema),login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);

export default router;

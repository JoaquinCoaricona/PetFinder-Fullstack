import User from "../Models/user.model.js";
import * as authService from "../Service/auth.service.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

export const register = async (req, res) => {
  try {
    const { token, user } = await authService.registerService(req.body);

    res.cookie("token", token, cookieOptions);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await authService.loginService(req.body);
    res.cookie("token", token, cookieOptions);
    return res.json(user);
  } catch (error) {
    if (error.message === "Usuario no encontrado" || error.message === "Contraseña Incorrecta") {
      return res.status(401).json({ message: error.message });
    }
    return res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    ...cookieOptions,
    expires: new Date(0), 
  });
  return res.sendStatus(204);
};

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.payload);

    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
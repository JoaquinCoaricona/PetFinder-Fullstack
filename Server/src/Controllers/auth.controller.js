import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../Libs/jwt.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken(userSaved.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Busco Por el email en la base de datos
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(500).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña Incorrecta" });
    }

    const token = await createAccessToken(userFound.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.log("Error en el login:", error);
    return res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0), 
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.payload);

  if (!userFound) {
    return res.send("Usuario no encontrado");
  }

  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

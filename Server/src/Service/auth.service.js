import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../Libs/jwt.js";

export const registerService = async ({ username, email, password }) => {

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: passwordHash,
  });
  const userSaved = await newUser.save();
  const token = await createAccessToken(userSaved.id);

  return {
    token,
    user: {
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    }
  };
};

export const loginService = async ({ email, password }) => {

  const userFound = await User.findOne({ email });
  if (!userFound) {
    throw new Error("Usuario no encontrado");
  }
  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch) {
    throw new Error("Contraseña Incorrecta");
  }

  const token = await createAccessToken(userFound.id);

  return {
    token,
    user: {
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    }
  };
};
import Post from "../Models/post.model.js";
import { uploadImage, deleteImage } from "../Libs/cloudinary.js";
import fs from "fs-extra";

export const getPostsService = async () => {
  return await Post.find();
};

export const getPostService = async (id) => {
  return await Post.findById(id).populate("user", "username");
};

export const createPostService = async (bodyData, files, userPayload) => {
  const { title, description, category, barrio, lat, lng } = bodyData;
  const imageLinks = []; 

  if (files && files.length > 0) {
    for (const file of files) {
      const result = await uploadImage(file.path);
      imageLinks.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
      await fs.unlink(file.path);
    }
  }

  const newPost = new Post({
    title,
    description,
    category,
    barrio,
    isActive: true,
    user: userPayload,
    location: {
      type: "Point",
      coordinates: [Number(lng), Number(lat)] 
    },
    images: imageLinks,
  });

  return await newPost.save();
};

export const updatePostService = async (id, bodyData, userPayload) => {
  const { title, description, category, barrio, lat, lng } = bodyData;

  const datosActualizados = {
    title,
    description,
    category,
    barrio,
    location: {
      type: "Point",
      coordinates: [Number(lng), Number(lat)] 
    }
  };

  return await Post.findOneAndUpdate(
    { _id: id, user: userPayload },
    datosActualizados,
    { new: true },
  );
};

export const deletePostService = async (id, userPayload) => {
  const foundPost = await Post.findOneAndDelete({
    _id: id,
    user: userPayload, //Verificamos aca para que solo el dueño verdadero pueda
    //borrar la publicacion
  });

  if (!foundPost) return null;

  if (foundPost.images && foundPost.images.length > 0) {
    for (const image of foundPost.images) {
      if (image.public_id) {
        await deleteImage(image.public_id); 
      }
    }
  }

  return foundPost;
};
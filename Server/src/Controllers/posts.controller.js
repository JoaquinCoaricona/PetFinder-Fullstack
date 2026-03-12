import Post from "../Models/post.model.js";
import { uploadImage,deleteImage } from "../Libs/cloudinary.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const foundPost = await Post.findById(id).populate("user", "username");

    if (!foundPost) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    return res.json(foundPost);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar la publicación" });
  }
};

export const createPost = async (req, res) => {
  try {

    const { title, description, category, barrio, lat, lng } = req.body;

    const imageLinks = []; 

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
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
      user: req.user.payload,
      location: {
        type: "Point",
        coordinates: [Number(lng), Number(lat)] 
      },
      images: imageLinks,
    });

    const postSaved = await newPost.save();
    res.json(postSaved);
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: error.message });
  }
};


export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { title, description, category, barrio, lat, lng } = req.body;

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

    const foundPost = await Post.findOneAndUpdate(
      { _id: id, user: req.user.payload },
      datosActualizados,
      { new: true },
    );

    if (!foundPost) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    return res.json(foundPost);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la publicación" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const foundPost = await Post.findOneAndDelete({
      _id: id,
      user: req.user.payload, //Verificamos aca para que solo el dueño verdadero pueda
      //borrar la publicacion
    });
    if (!foundPost) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    if (foundPost.images && foundPost.images.length > 0) {
      for (const image of foundPost.images) {
        if (image.public_id) {
          await deleteImage(image.public_id); 
        }
      }
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al Eliminar la publicación" });
  }
};




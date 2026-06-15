import * as postService from "../Services/post.service.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPostsService();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const foundPost = await postService.getPostService(id);

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
    const postSaved = await postService.createPostService(req.body, req.files, req.user.payload);
    res.json(postSaved);
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const foundPost = await postService.updatePostService(id, req.body, req.user.payload);

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

    const foundPost = await postService.deletePostService(id, req.user.payload);
    
    if (!foundPost) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al Eliminar la publicación" });
  }
};
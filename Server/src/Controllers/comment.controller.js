import Comment from "../Models/comment.model.js";
import * as commentService from "../Services/comment.service.js";

export const createComment = async (req, res) => {
  try {
    const savedComment = await commentService.createCommentService(req.body, req.user.payload);

    res.json(savedComment);

  } catch (error) {
    res.status(500).json({ message: "Error al comentar" });
  }
};


export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .populate("user", "username"); // acA es donde le estoy pdiiendo el nombre del 
                                     //que hizo ese comentario, user es lo que tengo en el comment
                                    //y username es lo que quiero buscar de la coleccion con la que esta
                                    //conectado ese campo   
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsFromUser = async (req, res) => {
  try {
    const comments = await Comment.find({
        user: req.user.payload
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedComment = await commentService.updateCommentService(id, content, req.user.payload);

    if (!updatedComment) {
      return res.status(404).json({ message: "Comentario no encontrado o no tenés permiso" });
    }

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error Al aactualizar" });
  }
};


export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedComment = await commentService.deleteCommentService(id, req.user.payload);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comentario no encontrado o no tenés permiso" });
    }

    return res.sendStatus(204); 
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar" });
  }
};
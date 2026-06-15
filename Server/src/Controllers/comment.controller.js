import * as commentService from "../Service/comment.service.js";

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
    const comments = await commentService.getCommentsService(postId); 
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsFromUser = async (req, res) => {
  try {
    const comments = await commentService.getCommentsFromUserService(req.user.payload);
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
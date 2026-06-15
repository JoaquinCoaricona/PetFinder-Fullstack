import Comment from "../Models/comment.model.js";

export const createCommentService = async ({ content, postId }, userPayload) => {
  const newComment = new Comment({
    content,
    user: userPayload, 
    post: postId
  });

  return await newComment.save();
};

export const getCommentsService = async (postId) => {
  return await Comment.find({ post: postId })
    .populate("user", "username"); // acA es donde le estoy pdiiendo el nombre del 
                                   //que hizo ese comentario, user es lo que tengo en el comment
                                  //y username es lo que quiero buscar de la coleccion con la que esta
                                  //conectado ese campo   
};

export const getCommentsFromUserService = async (userPayload) => {
  return await Comment.find({
      user: userPayload
  });
};

export const updateCommentService = async (id, content, userPayload) => {
  return await Comment.findOneAndUpdate(
    { _id: id, user: userPayload }, 
    { content },
    { new: true }
  ).populate("user", "username");
};

export const deleteCommentService = async (id, userPayload) => {
  return await Comment.findOneAndDelete({
    _id: id,
    user: userPayload,
  });
};
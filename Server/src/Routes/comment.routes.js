import { Router } from 'express';
import { authRequired } from '../Middlewares/validateToken.js'; 
import { 
  createComment,
  getComments,
  getCommentsFromUser,
  updateComment,
  deleteComment
} from '../Controllers/comment.controller.js';
import {createCommentSchema} from "../Schemas/comment.schema.js"
import {validateSchema} from "../Middlewares/validator.js"

const router = Router();

router.get('/comments/:postId', getComments);
router.get('/myComments', getCommentsFromUser);
router.post('/comment', authRequired,validateSchema(createCommentSchema), createComment);
router.put('/comment/:id', authRequired,validateSchema(createCommentSchema), updateComment);
router.delete('/comment/:id', authRequired, deleteComment);

export default router;
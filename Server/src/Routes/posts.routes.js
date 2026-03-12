import { Router } from 'express';
import { authRequired } from '../Middlewares/validateToken.js'; 
import { 
  getPosts, 
  getPost, 
  createPost, 
  updatePost, 
  deletePost 
} from '../Controllers/posts.controller.js';
import {createPostSchema} from "../Schemas/post.schema.js"
import {validateSchema} from "../Middlewares/validator.js"
import { upload } from "../Middlewares/multer.js";

const router = Router();


router.get('/posts', getPosts);
router.get('/post/:id', getPost);


router.post('/post', authRequired,upload.array("images", 5),validateSchema(createPostSchema), createPost);
router.put('/post/:id', authRequired,validateSchema(createPostSchema), updatePost);
router.delete('/post/:id', authRequired, deletePost);

export default router;
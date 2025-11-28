import { Router } from 'express';
import { PostController } from '../controllers/postController';
import { authMiddleware, validateRequest } from '../middlewares/auth';
import { createPostSchema, updatePostSchema } from '../schemas/validation';

const router = Router();

router.post('/', authMiddleware, validateRequest(createPostSchema), PostController.createPost);
router.get('/', PostController.getPosts);
router.get('/:id', PostController.getPost);
router.put('/:id', authMiddleware, validateRequest(updatePostSchema), PostController.updatePost);
router.delete('/:id', authMiddleware, PostController.deletePost);
router.post('/:id/like', authMiddleware, PostController.likePost);
router.delete('/:id/unlike', authMiddleware, PostController.unlikePost);

export default router;

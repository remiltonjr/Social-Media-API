import { Router } from 'express';
import { CommentController } from '../controllers/commentController';
import { authMiddleware, validateRequest } from '../middlewares/auth';
import { createCommentSchema } from '../schemas/validation';

const router = Router();

router.post('/:postId/comments', authMiddleware, validateRequest(createCommentSchema), CommentController.addComment);
router.get('/:postId/comments', CommentController.getComments);
router.delete('/comments/:id', authMiddleware, CommentController.deleteComment);

export default router;

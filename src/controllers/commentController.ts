import { Request, Response } from 'express';
import { CommentService } from '../services/commentService';
import { CreateCommentInput } from '../schemas/validation';

export class CommentController {
  static async addComment(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: 'Não autenticado' });
        return;
      }

      const { postId } = req.params;
      const data = req.body as CreateCommentInput;
      const comment = await CommentService.addComment(postId, userId, data);
      res.status(201).json(comment);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async getComments(req: Request, res: Response): Promise<void> {
    try {
      const { postId } = req.params;
      const comments = await CommentService.getPostComments(postId);
      res.status(200).json(comments);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async deleteComment(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: 'Não autenticado' });
        return;
      }

      const { id } = req.params;
      await CommentService.deleteComment(id, userId);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

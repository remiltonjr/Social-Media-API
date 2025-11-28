import { Request, Response } from 'express';
import { PostService } from '../services/postService';
import { CreatePostInput, UpdatePostInput } from '../schemas/validation';

export class PostController {
  static async createPost(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: 'Não autenticado' });
        return;
      }

      const data = req.body as CreatePostInput;
      const post = await PostService.createPost(userId, data);
      res.status(201).json(post);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async getPosts(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      const posts = await PostService.getAllPosts(userId);
      res.status(200).json(posts);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async getPost(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;
      const post = await PostService.getPost(id, userId);

      if (!post) {
        res.status(404).json({ message: 'Post não encontrado' });
        return;
      }

      res.status(200).json(post);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: 'Não autenticado' });
        return;
      }

      const { id } = req.params;
      const data = req.body as UpdatePostInput;
      const post = await PostService.updatePost(id, userId, data);
      res.status(200).json(post);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: 'Não autenticado' });
        return;
      }

      const { id } = req.params;
      await PostService.deletePost(id, userId);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async likePost(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: 'Não autenticado' });
        return;
      }

      const { id } = req.params;
      await PostService.likePost(id, userId);
      const post = await PostService.getPost(id, userId);
      res.status(200).json(post);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async unlikePost(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: 'Não autenticado' });
        return;
      }

      const { id } = req.params;
      await PostService.unlikePost(id, userId);
      const post = await PostService.getPost(id, userId);
      res.status(200).json(post);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

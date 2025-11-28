import { Comment, CommentResponse } from '../models/types';
import { CreateCommentInput } from '../schemas/validation';
import { AuthService } from './authService';
import { PostService } from './postService';

// Mock database
const comments: Map<string, Comment> = new Map();
const postComments: Map<string, string[]> = new Map(); // postId -> commentIds

export class CommentService {
  static async addComment(postId: string, userId: string, data: CreateCommentInput): Promise<CommentResponse> {
    // Verificar se post existe
    const post = await PostService.getPost(postId);
    if (!post) {
      throw { statusCode: 404, message: 'Post não encontrado' };
    }

    const commentId = Date.now().toString();
    const comment: Comment = {
      id: commentId,
      postId,
      userId,
      content: data.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    comments.set(commentId, comment);

    // Associar comentário ao post
    const postCommentsList = postComments.get(postId) || [];
    postCommentsList.push(commentId);
    postComments.set(postId, postCommentsList);

    return this.formatCommentResponse(comment);
  }

  static async getPostComments(postId: string): Promise<CommentResponse[]> {
    const commentIds = postComments.get(postId) || [];
    return Promise.all(
      commentIds.map(id => {
        const comment = comments.get(id);
        return comment ? this.formatCommentResponse(comment) : Promise.reject();
      })
    );
  }

  static async deleteComment(commentId: string, userId: string): Promise<void> {
    const comment = comments.get(commentId);
    if (!comment) {
      throw { statusCode: 404, message: 'Comentário não encontrado' };
    }

    if (comment.userId !== userId) {
      throw { statusCode: 403, message: 'Sem permissão para deletar este comentário' };
    }

    comments.delete(commentId);

    // Remover de postComments
    const commentIds = postComments.get(comment.postId) || [];
    const updatedIds = commentIds.filter(id => id !== commentId);
    postComments.set(comment.postId, updatedIds);
  }

  private static async formatCommentResponse(comment: Comment): Promise<CommentResponse> {
    const author = await AuthService.getUserById(comment.userId);

    return {
      ...comment,
      author: author ? AuthService.formatUserResponse(author) : undefined,
    };
  }
}

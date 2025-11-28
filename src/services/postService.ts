import { Post, PostResponse } from '../models/types';
import { CreatePostInput, UpdatePostInput } from '../schemas/validation';
import { AuthService } from './authService';

// Mock database
const posts: Map<string, Post> = new Map();
const postLikes: Map<string, Set<string>> = new Map(); // postId -> Set<userId>

export class PostService {
  static async createPost(userId: string, data: CreatePostInput): Promise<PostResponse> {
    const postId = Date.now().toString();
    const post: Post = {
      id: postId,
      userId,
      content: data.content,
      likesCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    posts.set(postId, post);
    postLikes.set(postId, new Set());

    return this.formatPostResponse(post);
  }

  static async getPost(postId: string, currentUserId?: string): Promise<PostResponse | null> {
    const post = posts.get(postId);
    if (!post) return null;

    return this.formatPostResponse(post, currentUserId);
  }

  static async getAllPosts(currentUserId?: string): Promise<PostResponse[]> {
    return Promise.all(
      Array.from(posts.values()).map(post =>
        this.formatPostResponse(post, currentUserId)
      )
    );
  }

  static async updatePost(postId: string, userId: string, data: UpdatePostInput): Promise<PostResponse> {
    const post = posts.get(postId);
    if (!post) {
      throw { statusCode: 404, message: 'Post não encontrado' };
    }

    if (post.userId !== userId) {
      throw { statusCode: 403, message: 'Sem permissão para atualizar este post' };
    }

    post.content = data.content;
    post.updatedAt = new Date();
    posts.set(postId, post);

    return this.formatPostResponse(post, userId);
  }

  static async deletePost(postId: string, userId: string): Promise<void> {
    const post = posts.get(postId);
    if (!post) {
      throw { statusCode: 404, message: 'Post não encontrado' };
    }

    if (post.userId !== userId) {
      throw { statusCode: 403, message: 'Sem permissão para deletar este post' };
    }

    posts.delete(postId);
    postLikes.delete(postId);
  }

  static async likePost(postId: string, userId: string): Promise<void> {
    const post = posts.get(postId);
    if (!post) {
      throw { statusCode: 404, message: 'Post não encontrado' };
    }

    const likes = postLikes.get(postId) || new Set();
    if (!likes.has(userId)) {
      likes.add(userId);
      post.likesCount++;
      postLikes.set(postId, likes);
      posts.set(postId, post);
    }
  }

  static async unlikePost(postId: string, userId: string): Promise<void> {
    const post = posts.get(postId);
    if (!post) {
      throw { statusCode: 404, message: 'Post não encontrado' };
    }

    const likes = postLikes.get(postId) || new Set();
    if (likes.has(userId)) {
      likes.delete(userId);
      post.likesCount--;
      postLikes.set(postId, likes);
      posts.set(postId, post);
    }
  }

  private static async formatPostResponse(post: Post, currentUserId?: string): Promise<PostResponse> {
    const author = await AuthService.getUserById(post.userId);
    const isLikedByUser = currentUserId ? postLikes.get(post.id)?.has(currentUserId) : false;

    return {
      ...post,
      author: author ? AuthService.formatUserResponse(author) : undefined,
      isLikedByUser,
    };
  }
}

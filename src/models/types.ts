// Tipos de usuário
export interface User {
  id: string;
  email: string;
  password: string; // Hash
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// Tipos de post
export interface Post {
  id: string;
  userId: string;
  content: string;
  likesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostResponse extends Post {
  author?: UserResponse;
  comments?: CommentResponse[];
  isLikedByUser?: boolean;
}

// Tipos de comentário
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentResponse extends Comment {
  author?: UserResponse;
}

// Tipos de autenticação
export interface JWTPayload {
  userId: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

// Tipos de erro
export interface ApiError {
  message: string;
  statusCode: number;
}

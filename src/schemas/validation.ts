import { z } from 'zod';

// Schemas de autenticação
export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

// Schemas de post
export const createPostSchema = z.object({
  content: z.string().min(1, 'Conteúdo é obrigatório').max(500, 'Máximo 500 caracteres'),
});

export const updatePostSchema = z.object({
  content: z.string().min(1, 'Conteúdo é obrigatório').max(500, 'Máximo 500 caracteres'),
});

// Schemas de comentário
export const createCommentSchema = z.object({
  content: z.string().min(1, 'Conteúdo é obrigatório').max(300, 'Máximo 300 caracteres'),
});

// Tipos inferidos
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;

import express, { Express } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import { errorHandler } from './middlewares/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'API rodando com sucesso! ✅' });
});

// Rotas
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/posts', commentRoutes);

// Error handler
app.use(errorHandler);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  console.log(`📝 Health check: http://localhost:${port}/health`);
});

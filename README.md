# Social Media API

REST API de rede social em TypeScript com Express.js, autenticação JWT e PostgreSQL.

## Funcionalidades

- ✅ Autenticação com JWT
- ✅ CRUD completo de Posts
- ✅ Sistema de Comentários
- ✅ Sistema de Likes
- ✅ Validação com Zod
- ✅ Testes com Jest
- ✅ TypeScript com tipos rigorosos

## Tecnologias

- **Runtime**: Node.js 18+
- **Linguagem**: TypeScript
- **Framework**: Express.js
- **Banco de Dados**: PostgreSQL (pronto para integração)
- **Autenticação**: JWT
- **Validação**: Zod
- **Testes**: Jest
- **Hashing**: bcryptjs

## Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Setup

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/social-media-api.git
cd social-media-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie o servidor:
```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

## Scripts Disponíveis

- `npm run dev` - Inicia servidor em modo desenvolvimento
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Inicia servidor em produção
- `npm test` - Executa testes
- `npm run test:watch` - Executa testes em modo watch
- `npm run lint` - Verifica qualidade do código

## Endpoints da API

### Autenticação
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Fazer login

### Posts
- `GET /posts` - Listar todos os posts
- `POST /posts` - Criar novo post (autenticado)
- `GET /posts/:id` - Obter detalhes de um post
- `PUT /posts/:id` - Atualizar post (autenticado)
- `DELETE /posts/:id` - Deletar post (autenticado)
- `POST /posts/:id/like` - Dar like em post (autenticado)
- `DELETE /posts/:id/unlike` - Remover like (autenticado)

### Comentários
- `POST /posts/:postId/comments` - Adicionar comentário (autenticado)
- `GET /posts/:postId/comments` - Listar comentários
- `DELETE /posts/comments/:id` - Deletar comentário (autenticado)

## Estrutura do Projeto

```
src/
├── controllers/      # Controladores (lógica de requisições)
├── routes/          # Definição de rotas
├── middlewares/     # Middlewares (autenticação, validação)
├── services/        # Serviços (lógica de negócio)
├── models/          # Tipos e interfaces TypeScript
├── schemas/         # Schemas de validação (Zod)
├── database/        # Configuração de banco de dados
└── index.ts         # Entry point
tests/               # Suite de testes
```

## Exemplo de Uso

### Registrar Usuário
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "senha123",
    "name": "Seu Nome"
  }'
```

### Fazer Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "senha123"
  }'
```

### Criar Post (com token)
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "content": "Olá, mundo!"
  }'
```

## Desenvolvimento Futuro

- [ ] Integração com PostgreSQL real
- [ ] Sistema de followers/amigos
- [ ] Feed personalizado
- [ ] Notificações em tempo real (WebSocket)
- [ ] Upload de imagens
- [ ] Rate limiting
- [ ] Caching com Redis
- [ ] Documentação Swagger/OpenAPI

## Testes

Execute a suite de testes:
```bash
npm test
```

Com modo watch:
```bash
npm run test:watch
```

## Licença

MIT

## Autor

Desenvolvido com ❤️

## Contribuições

Contribuições são bem-vindas! Abra uma issue ou pull request.


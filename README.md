# 🌐 Social Media API

Uma API de rede social simples feita em **TypeScript** e **Express.js**. Permite usuários criar contas, postar mensagens, comentar e dar likes!

---

## 🎯 O Que É?

Imagine um mini **Twitter/X**. Você pode:
- ✅ Criar sua conta (com email e senha)
- ✅ Escrever posts
- ✅ Comentar em posts de outros
- ✅ Dar likes
- ✅ Tudo protegido com autenticação

---

## 🚀 Como Começar

### 1. Instale Node.js
Baixe em: https://nodejs.org/

### 2. Clone e Instale
```bash
git clone https://github.com/remiltonjr/Social-Media-API.git
cd Social-Media-API
npm install
```

### 3. Inicie o Servidor
```bash
npm run dev
```

Pronto! A API está rodando em **http://localhost:3000**

---

## 📝 Exemplo: Usar a API

### Passo 1: Criar uma Conta
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123",
    "name": "João"
  }'
```

**Resposta:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "1234",
    "email": "joao@example.com",
    "name": "João"
  }
}
```

💾 **Guarde o `token`! Você vai precisar dele.**

### Passo 2: Fazer Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### Passo 3: Criar um Post
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "content": "Olá, mundo!"
  }'
```

### Passo 4: Listar Posts
```bash
curl http://localhost:3000/posts
```

### Passo 5: Comentar em um Post
```bash
curl -X POST http://localhost:3000/posts/NUMERO_DO_POST/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "content": "Que legal!"
  }'
```

### Passo 6: Dar Like
```bash
curl -X POST http://localhost:3000/posts/NUMERO_DO_POST/like \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 🔐 Como Funciona a Segurança?

**Token JWT** = Um "cartão de identidade digital"

1. Você faz login → Recebe um token
2. Envia o token em cada requisição → Servidor confia que é você
3. Sem token → Não consegue fazer certas ações

É como um passaporte da internet! 🛂

---

## 📚 Todos os Endpoints

### 🔑 Autenticação
| Método | Endpoint | O Que Faz |
|--------|----------|----------|
| POST | `/auth/register` | Criar nova conta |
| POST | `/auth/login` | Fazer login |

### 📄 Posts
| Método | Endpoint | O Que Faz |
|--------|----------|----------|
| GET | `/posts` | Ver todos os posts |
| POST | `/posts` | Criar novo post ⭐ |
| GET | `/posts/:id` | Ver um post específico |
| PUT | `/posts/:id` | Editar seu post ⭐ |
| DELETE | `/posts/:id` | Deletar seu post ⭐ |
| POST | `/posts/:id/like` | Dar like ⭐ |
| DELETE | `/posts/:id/unlike` | Remover like ⭐ |

### 💬 Comentários
| Método | Endpoint | O Que Faz |
|--------|----------|----------|
| POST | `/posts/:postId/comments` | Comentar em um post ⭐ |
| GET | `/posts/:postId/comments` | Ver comentários |
| DELETE | `/posts/comments/:id` | Deletar seu comentário ⭐ |

⭐ = Precisa estar autenticado (enviar token)

---

## 🏗️ Estrutura do Código

```
src/
├── controllers/          # Recebem requisições
├── services/             # Fazem o trabalho
├── routes/               # Definem URLs
├── middlewares/          # Verificam autenticação
├── models/               # Tipos de dados
├── schemas/              # Validam entrada
└── index.ts              # Servidor principal
```

**Analogy:** Como um restaurante 🍽️
- **Routes** = Entrada do restaurante
- **Controllers** = Garçom que pega o pedido
- **Services** = Cozinheiro que prepara
- **Middlewares** = Segurança na porta
- **Models** = Tipos de pratos no menu

---

## 🧪 Testar Tudo

```bash
npm test
```

Isso roda testes automatizados para garantir que tudo funciona.

---

## 📝 Scripts Úteis

```bash
npm run dev          # Rodando em desenvolvimento
npm run build        # Compilar código
npm start            # Rodar em produção
npm test             # Executar testes
npm run lint         # Verificar qualidade
```

---

## 🎓 O Que Aprendi Aqui?

- ✅ Como fazer uma API REST
- ✅ Autenticação com tokens JWT
- ✅ Validação de dados
- ✅ TypeScript (programação com tipos)
- ✅ Organização de código profissional
- ✅ Como usar Git/GitHub

---

## 🚀 Próximas Melhorias

- [ ] Conectar a um banco de dados real
- [ ] Seguir/unfollow usuários
- [ ] Feed personalizado
- [ ] Buscar posts
- [ ] Imagens nos posts
- [ ] Notificações
- [ ] App mobile

---

## ❓ Dúvidas?

Leia o arquivo `src/index.ts` para entender como o servidor inicia.

Veja `src/services/` para a lógica das funcionalidades.

Acesse `src/routes/` para ver como as URLs funcionam.

---

## 📄 Licença

MIT - Use livremente!

---

**Desenvolvido com ❤️ por Remilton Jr**


# 📤 Como Subir para GitHub

## 1️⃣ Instale Git (se não tiver)

Baixe em: https://git-scm.com/download/win

Após instalar, reinicie o VS Code e o terminal.

## 2️⃣ Configure Git (primeira vez apenas)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@github.com"
```

## 3️⃣ Crie um Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name**: `social-media-api`
   - **Description**: `REST API de rede social em TypeScript, Express e JWT`
   - **Visibility**: Public (recomendado para portfólio)
   - Clique em **Create repository**

3. Copie o URL (ex: `https://github.com/seu-usuario/social-media-api.git`)

## 4️⃣ Execute no Terminal do Projeto

Na pasta do projeto:

```bash
# Inicializar repositório Git
git init

# Adicionar repositório remoto (copie do GitHub)
git remote add origin https://github.com/SEU-USUARIO/social-media-api.git

# Adicionar todos os arquivos
git add .

# Fazer commit inicial
git commit -m "feat: initial commit - Social Media API with TypeScript, Express and JWT"

# Renomear branch para 'main'
git branch -M main

# Fazer push para GitHub
git push -u origin main
```

## 5️⃣ Pronto! 🎉

Seu projeto estará em:
```
https://github.com/seu-usuario/social-media-api
```

## 📝 Próximos Commits

```bash
# Depois que o projeto está online, use para atualizar:
git add .
git commit -m "Descrição do que foi mudado"
git push
```

## 🔑 Autenticação GitHub

Se pedir senha:
1. Gere um **Personal Access Token**: https://github.com/settings/tokens
2. Cole o token no prompt de senha

Ou use **GitHub CLI**: https://cli.github.com/

---

**Pronto para o mundo! 🚀**

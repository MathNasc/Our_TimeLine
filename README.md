# Nossa Retrospectiva ❤️

Uma plataforma (SaaS) completa para criar, gerenciar e compartilhar retrospectivas e momentos especiais de relacionamentos.

## 🚀 Arquitetura e Tecnologias

O projeto foi modernizado de uma página estática para uma plataforma web Full-Stack robusta, utilizando:

* **Backend:** Node.js com Express.js
* **Frontend (Dashboard):** Preact, HTM e Tailwind CSS (via CDN)
* **Banco de Dados:** PostgreSQL hospedado no Supabase
* **ORM:** Drizzle ORM
* **Autenticação:** Supabase Auth (E-mail e Senha)
* **Armazenamento (Uploads):** Supabase Storage + Multer (Node)
* **Build e Deploy:** Esbuild, TypeScript (tsc) e otimizado para **Vercel Serverless Functions**.

## ✨ Funcionalidades

* **Sistema de Autenticação:** Crie sua conta e acesse seu dashboard exclusivo.
* **Upload Direto para Nuvem:** Capas, fotos de galeria e linha do tempo são salvas no Supabase Storage. Nenhuma imagem precisa ser salva manualmente em pastas.
* **Privacidade e Rascunhos:** Retrospectivas em edição ficam offline (rascunho). Apenas o autor logado pode visualizá-las no preview.
* **URLs Públicas Personalizadas:** Escolha o link da sua retrospectiva (ex: `seudominio.com/r/joao-e-maria`) e torne-a acessível quando estiver pronta.
* **SSR e Metatags Dinâmicas:** As páginas públicas renderizam as Open Graph tags (OG) dinamicamente para garantir um compartilhamento perfeito no WhatsApp/Instagram.

## 🛠️ Como rodar localmente (Desenvolvimento)

### 1. Pré-requisitos
* Node.js (v18+)
* Conta no Supabase (com projeto configurado)

### 2. Instalação
Clone o projeto e instale as dependências:
\`\`\`bash
npm install
\`\`\`

### 3. Variáveis de Ambiente
Crie um arquivo \`.env\` na raiz do projeto com as chaves do seu Supabase:

\`\`\`env
# URL de Conexão com Banco de Dados PostgreSQL (Pooler ou Direct)
DATABASE_URL="postgresql://user:pass@host:port/postgres"

# Supabase API (Storage e Auth)
SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_ANON_KEY="eyJhb..."
SUPABASE_SERVICE_ROLE_KEY="eyJhb..."
\`\`\`

### 4. Estrutura de Banco de Dados
Sincronize o schema do banco de dados (certifique-se de estar rodando em um DB limpo):
\`\`\`bash
npx drizzle-kit push --config=src/db/drizzle.config.ts
\`\`\`
E crie o bucket \`retrospectives\` como **Público** no Supabase Storage.

### 5. Iniciar o Servidor
Execute o servidor em ambiente de desenvolvimento (ou build):
\`\`\`bash
npm run build
npm run start
\`\`\`
O site e o painel estarão disponíveis em \`http://localhost:3000\`.

## 🌐 Deploy (Vercel)

O projeto está configurado para deploy imediato e nativo na **Vercel** através do \`vercel.json\`.
O backend funcionará como Serverless Functions.

1. Suba o projeto para um repositório no GitHub.
2. Importe-o no painel da Vercel.
3. Configure as **Environment Variables** (idênticas ao \`.env\`).
4. A Vercel executará o comando \`npm run build\` automaticamente e realizará o deploy.

---
Desenvolvido com ❤️

# 🌱 Verde Perto

> Feira livre digital — Hortifruti de produtores locais direto para você.

![Verde Perto](src/assets/hero-farmers.png)

## Sobre o projeto

O Verde Perto resolve um problema real: produtores rurais perdem tempo atendendo ligações de clientes querendo saber o que tem disponível, e clientes ficam frustrados sem conseguir comprar.

A solução é uma **vitrine digital atualizada em tempo real**. O cliente abre o app, vê os produtos disponíveis hoje com foto, preço e quantidade, e com dois cliques já está no WhatsApp do produtor com a mensagem pré-preenchida. Zero cadastro, zero app instalado.

## Funcionalidades

### Para o cliente
- 🛒 Vitrine de produtos com foto, preço e quantidade disponível
- 🔍 Filtro por categoria (Frutas, Verduras, Legumes)
- 📱 Pedido direto via WhatsApp com mensagem pré-preenchida
- ⚡ Atualização em tempo real — produtos esgotados somem automaticamente

### Para o produtor
- 🔐 Login seguro com e-mail e senha
- ➕ Adicionar, editar e remover produtos
- 📦 Atualização de estoque em segundos
- 👁️ Mudanças visíveis para clientes imediatamente

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + TypeScript |
| Roteamento | TanStack Router |
| Estilização | Tailwind CSS v4 |
| Backend | Supabase (PostgreSQL + Auth + Realtime) |
| Deploy | Vercel |

## Como rodar localmente

### Pré-requisitos
- Node.js 18+
- Conta no [Supabase](https://supabase.com)

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/jorgenet0h/verde-perto.git
cd verde-perto
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**
```bash
cp .env.example .env
```
Preencha o `.env` com suas credenciais do Supabase:
```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
```

**4. Configure o banco de dados**

No Supabase → SQL Editor, execute o arquivo `sql/setup.sql`.

**5. Rode o projeto**
```bash
npm run dev
```

Acesse `http://localhost:5173`

## Estrutura do projeto

```
src/
├── assets/          # Imagens estáticas
├── components/      # Componentes React
│   ├── Catalog.tsx      # Vitrine de produtos
│   ├── ProductCard.tsx  # Card individual de produto
│   └── ProducerPanel.tsx # Painel do produtor
├── lib/
│   ├── store.ts     # Hooks de dados (Supabase)
│   └── supabase.ts  # Configuração do cliente Supabase
├── routes/
│   ├── __root.tsx   # Layout raiz
│   └── index.tsx    # Página principal
└── styles.css       # Estilos globais (Tailwind)
sql/
└── setup.sql        # Schema e dados iniciais do banco
```

## Deploy

O projeto está configurado para deploy automático na Vercel. Qualquer push na branch `main` aciona um novo deploy.

Variáveis de ambiente necessárias na Vercel:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## MVP — Escopo

✅ Vitrine de produtos com foto, preço e quantidade  
✅ Atualização diária do estoque pelo produtor  
✅ Botão de pedido via WhatsApp com mensagem pré-preenchida  

❌ Pagamento dentro do app  
❌ Sistema de entrega próprio  
❌ Avaliações e reviews  

---

Desenvolvido por **Jorge** · Squad 4 · PDA Vibecoding

# 🎫 Advanced Ticket Bot

Um bot de tickets **profissional**, **moderno** e **totalmente personalizável** para Discord, desenvolvido em **JavaScript** utilizando **discord.js v14** e **MongoDB (Mongoose)**.

Ideal para servidores que precisam de um sistema de suporte organizado, privado e fácil de configurar **diretamente pelo Discord**, sem necessidade de alterar o código.

---

## ✨ Funcionalidades

* 🛠️ **Sistema de Handler**
  Estrutura organizada e escalável para comandos e eventos.

* 📂 **Tickets Privados**
  Criação automática de canais privados para atendimento.

* ⚙️ **Painel 100% Configurável**
  Comando `/config` com botões e modais para editar textos e imagens direto pelo Discord.

* 🖼️ **Imagens Personalizadas**
  Suporte para banners e thumbnails via link.

* 💾 **Banco de Dados (MongoDB)**
  Todas as configurações são salvas automaticamente usando Mongoose.

* ⏱️ **Fechamento Automático**
  Contador regressivo visual (5 segundos) ao fechar um ticket.

* 🔄 **Status Rotativo**
  Presença do bot muda automaticamente a cada 10 segundos.

---

## 📦 Dependências

Principais bibliotecas utilizadas no projeto:

* **discord.js** — Integração com a API do Discord
* **mongoose** — Conexão e manipulação do MongoDB
* **dotenv** — Gerenciamento de variáveis de ambiente

---

## 🚀 Instalação e Configuração

Siga os passos abaixo para rodar o bot corretamente.

### 1️⃣ Clonar ou Baixar

Baixe os arquivos do repositório e coloque em uma pasta no seu computador ou servidor.

---

### 2️⃣ Instalar Dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install discord.js mongoose dotenv
```

---

### 3️⃣ Configurar o Ambiente (.env)

Crie um arquivo chamado `.env` na raiz do projeto (ao lado do `index.js`) e adicione:

```env
TOKEN=SEU_TOKEN_DO_BOT_AQUI
CLIENT_ID=SEU_ID_DO_BOT_AQUI
MONGO_URI=SUA_CONNECTION_STRING_MONGODB
```

🔹 **Token e Client ID**: Discord Developer Portal
🔹 **Mongo URI**: MongoDB Atlas

⚠️ **Nunca suba o arquivo `.env` para o GitHub.**

---

### 4️⃣ Ligar o Bot

Execute o comando abaixo para iniciar o bot:

```bash
node index.js
```

Se tudo estiver correto, aparecerá no terminal:

```bash
Logado como NomeDoBot#0000
Comandos (/) registrados com sucesso.
```

---

## 📁 Estrutura de Arquivos

```bash
/
├── .env                 # Variáveis de ambiente (NÃO SUBA NO GITHUB)
├── .gitignore           # Ignora node_modules
├── index.js             # Arquivo principal
├── src
│   ├── commands         # Comandos Slash (/painel, /config)
│   ├── events           # Eventos (ready, interactionCreate)
│   ├── functions        # Handlers e funções auxiliares
│   └── schemas          # Schemas do banco de dados (MongoDB)
└── package.json
```

---

## 🎮 Comandos

### `/painel`

📌 **Permissão:** Administrador
Envia o painel com botão para abrir ticket.

---

### `/config`

📌 **Permissão:** Administrador
Abre o menu de configuração para editar:

* Títulos
* Descrições
* Mensagens do ticket
* Imagens (banner e thumbnail)

Tudo é salvo automaticamente no banco de dados.

---

## 🛠️ Personalização (Sem Código)

Você **não precisa editar arquivos** para personalizar o bot:

1. Use o comando `/config` no Discord
2. Clique em **Editar Painel** ou **Editar Mensagem do Ticket**
3. Preencha os formulários
4. Pronto! O bot salva tudo automaticamente no MongoDB

---

## 🤝 Contribuição

Contribuições são bem-vindas!

* Abra uma **Issue** para reportar bugs ou sugerir melhorias
* Envie um **Pull Request** com novas funcionalidades ou correções

---

## 📝 Licença

Este projeto está licenciado sob a **MIT License**.

---

<p align="center">
Feito com 💝 por <strong>Luluzin</strong>
</p>

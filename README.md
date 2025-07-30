# 📝 DoList

**DoList** é uma aplicação de lista de tarefas com autenticação de usuários, permitindo que cada pessoa crie, visualize, edite e remova suas próprias tarefas.

---

## 🚀 Funcionalidades

- Cadastro de usuário
- Login com autenticação via JWT
- Criação, edição, exclusão e visualização de tarefas por usuário
- Documentação da API com Swagger
- Testes automatizados com Jest

---

## 🛠 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Swagger
- Postman
- Jest

---

## ⚙️ Como rodar o projeto localmente

1. **Clone o repositório:**

git clone https://github.com/leonardomenesesdev/dolist.git
cd dolist
Instale as dependências:

bash
Copiar
Editar
npm install
Configure o ambiente:

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

env
Copiar
Editar
DB_CONNECTION_STRING=coloque_aqui_sua_string_de_conexão_mongodb
JWT_SECRET=sua_chave_secreta_jwt
Rode a aplicação em modo desenvolvimento:

bash
Copiar
Editar
npm run dev
Acesse a documentação da API no navegador:

bash
Copiar
Editar
http://localhost:3000/api-docs
🧪 Testes
Execute os testes com:

bash
Copiar
Editar
npm test

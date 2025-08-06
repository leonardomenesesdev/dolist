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

**Clone o repositório:**

  - git clone https://github.com/leonardomenesesdev/dolist.git
  - cd dolist

**Instale as dependências:**

  - npm install

**Configure o ambiente:**

  Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
  
  - DB_CONNECTION_STRING=coloque_aqui_sua_string_de_conexão_mongodb
  - JWT_SECRET=sua_chave_secreta_jwt

**Rode a aplicação em modo desenvolvimento:**
  
  - npm run dev
   
---

## 🛞 Acesse a documentação da API no navegador:

http://localhost:3000/api-docs

🧪 Testes
Execute os testes com:

- npm test

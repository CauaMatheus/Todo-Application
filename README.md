<h1 align="center"> Todo Application</h1>

## Sumário:
- 💬 [Descrição](#description)
- 👨‍💻 [Tecnologias](#technologies)
- [🔗 Rotas da aplicação](#-rotas-da-aplicação)
  - [POST `/signup`]()
  - [POST `/signin`]()
  - [GET `/users/profile/:id`]()
  - [GET `/users/todos/:id`]()
  - [GET `/validateEmail/:token`]()
  - [PUT `/profile`]()
  - [PATCH `/profile/upgrade`]()
  - [DELETE `/profile`]()
  - [POST `/todos`]()
  - [PUT `/todos/:todoId`]()
  - [DELETE `/todos/:todoId`]()
- 📦️ [Como usar](#clone)


## 💬 Descrição
Essa é uma aplicação de gerenciamento de tarefas, em inglês ***todos***, que contêm:<br/>
- Sistema de autenticação JWT 
- Envio de email para verificar se ele realmente existe
- Hash na senha, para dificultar vazamento de dados
- CRUD de usuários
- CRUD de ***todos***
- Plano **pro** que te da a vantagem de criar mais de 10 ***todos***

## 👨‍💻 Tecnologias

- [NodeJs](https://github.com/nodejs)
- [Express](https://github.com/expressjs/express)
- [Typescript](https://github.com/microsoft/TypeScript)
- [ESLint](https://github.com/eslint/eslint)
- [Nodemailer](https://github.com/nodemailer/nodemailer)
- [UUID](https://github.com/uuidjs/uuid)


## IDE

- [Visual Studio Code](https://code.visualstudio.com/)

## 🔗 Rotas da aplicação
  ### POST `/signup`
  Essa rota deve receber `username`, `email` e `password` pelo `body` da requisição, e cria um usuário com as seguintes propriedades:
  ```
  {
  "pro": boolean,
  "confirmed": boolean,
  "friends": [],
  "created_at": Date,
  "updated_at": Date,
  "_id": uuid + uuid,
  "id": uuid,
  "username": string,
  "email": string,
  "password": hash
}
  ```
Após a criação do usuário, ela manda um email para o usuário com uma url que contem um token para a confirmação do email dado.


### POST `/signin`
Essa rota deve receber `email` e `password` pelo `body` da requisição. <br/>
Após a verificação da senha e do email, se for validado ela retornarar um JWT que contem `_id` e `id`, e expira em 5 dias. 


### GET `/validateEmail/:token`
A rota deve receber o `token` pelos `params` da requisição <br/>
O token contem o email a ser confirmado, e ao confirmar, a propriedade `confirmed` do `user` é alterada para `true`


### GET `/users/profile/:id`
A rota deve receber o `id` do `user` pelos `params` da requisição, e retorna um objeto com as seguintes informações: <br/>
```
{
  "pro": boolean,
  "confirmed": boolean,
  "friends": [],
  "created_at": Date,
  "updated_at": Date,
  "id": uuid,
  "username": string,
  "email": string
}
```
### PUT `/profile`
Essa rota deve receber obrigatoriamente `password` pelo `body` da requisição e `authorization` que é um JWT pelos `headers`.<br/>
Ela também pode receber `newUsername` e `newPassword` pelo `body` da requisição.<br/>
A rota altera de acordo com o que ela recebeu as propriedades do `user`, e atualiza também a propriedade `updated_at`


### PATCH `/profile/upgrade`
Essa rota recebe `authorization` que é um JWT pelos `headers` da requisição, e então altera a propriedade `pro` do `user` para `true`


### DELETE `/profile`
Essa rota recebe `authorization` que é um JWT pelos `headers` e `password` pelo `body` da requisição<br/>
Se a senha for válida, a conta é excluida


### POST `/todos`
Essa rota recebe `authorization` que é um JWT pelos `headers`<br/>
Recebe também `title`, `description` e `deadline` pelo `body` da requisição<br/>
A rota retorna um objeto com as seguintes propriedades:
```
{
  "id": uuid,
  "userId": foreign key => user.id,
  "title": string,
  "description": string,
  "state": boolean,
  "created_at": Date,
  "deadline": Date
}
```
### GET `/users/todos/:id`
Essa rota deve receber o `id` do `user` pelos `params` da requisição, e deve retornar um array com todos os ***todos*** do `user` com o `id` dado.


### PUT `/todos/:todoId`
Essa rota recebe `authorization` que é um JWT pelos `headers` e o `todoId` pelos `params` da requisição<br/>
Ela também pode receber `title`, `description` e `deadline` pelo `body` da requisição.<br/>
Se a validação passar, ela irá atualizar as informações dadas e alterará o valor de `updated_at`


### DELETE `/todos/:todoId`
Essa rota recebe `authorization` que é um JWT pelos `headers` e o `todoId` pelos `params` da requisição<br/>
Se a validação passar a rota irá excluir o ***todo*** com o `id` passado.




## 📦️ Como usar

Primeiramente você deve baixar e entrar na pasta

```bash
  ❯ git clone https://github.com/CauaMatheus/Todo-Application.git
  ❯ cd Todo-Application
```

E agora para baixar as dependências e rodar o projeto basta seguir o exemplo de acordo com o seu package manager

** yarn**

```bash
  ❯ yarn
  ❯ yarn dev
```

** npm**

```bash
  ❯ npm install
  ❯ npm dev
```

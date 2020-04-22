<div align="center">
  <img alt="Minu" title="Minu" src=".github/logo.png" />
</div>
<br>
<p>Minu será uma aplicação onde os restaurantes terão a liberdade de criar seus menus/cardápios virtualmente, e os clientes poderão acessá-los e efetuar pedidos atráves de seus dispositivos móveis em tempo real. O projeto tem como objetivo facilitar, e ao mesmo tempo simplificar o processo de realização de pedidos em restaurantes, juntamente do processo de atendimento do cliente por parte do estabelecimento.</p>

## :rocket: Tecnologias

-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [JWT](https://jwt.io/)
-   [Yup](https://www.npmjs.com/package/yup)
-   [Multer](https://github.com/expressjs/multer)
-   [ReactJS](https://reactjs.org/)
-   [NodeMailer](https://nodemailer.com/about/)
-   [Redux](https://redux.js.org/)
-   [Redux-Saga](https://redux-saga.js.org/)
-   [Redux-persist](https://github.com/rt2zz/redux-persist)
-   [Styled-components](https://www.styled-components.com/)
-   [Axios](https://github.com/axios/axios)
-   [React-icons](https://react-icons.netlify.com/)
-   [Reactotron](https://infinite.red/reactotron)
-   [Immer](https://github.com/immerjs/immer)
-   [Polished](https://polished.js.org/)
-   [Date-fns](https://date-fns.org/)
-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [VS Code](https://code.visualstudio.com/)

## :information_source: Instruções

### Pré-requisitos para rodar aplicação:

* [Git](https://git-scm.com)
* [Node](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/) 

Utilizando [docker](https://docs.docker.com/engine/):

```bash
# Instalando imagem do Postgres 
docker run --name IMAGE_NAME -e POSTGRES_PASSWORD=PASSWORD -p 5432:5432 -d postgres:11

# Instalando imagem do Redis
docker run --name IMAGE_NAME -p 6379:6379 -d -t redis:alpine

# Inicializando Postgres
docker start POSTGRES_IMAGE_NAME

# Inicializando Redis
docker start REDIS_IMAGE_NAME

```

Clone o repositório:

```bash

git clone https://github.com/vitoraraujodev/minu.git

```

No seu VSCode, instale as extenções de padronização de código:

<blockquote><strong>ESLint</strong>, <strong>Prettier</strong> e <strong>EditorConfig</strong></blockquote>

Para permitir que o ESLint faça os ajustes automaticamente, adicione ao seu <b>settings.json</b>:

<blockquote><strong>Ctrl+Shift+P</strong></blockquote>

Selecione "Preferences: Open Settings (JSON)"

Adicione neste arquivo:

```json
  "editor.rulers": [80, 120],
  "editor.tabSize": 2,

  "[javascript]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    }
  },
  "[javascriptreact]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    }
  },
```

### Backend

```bash
# Entre no diretório do backend
cd Minu/backend

# Instale as dependências
yarn

# Faça as migrações
yarn sequelize db:migrate

# Rode a API
yarn dev 
```

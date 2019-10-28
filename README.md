# Happy Harvest Server

Application server | Node.js | Express.js

## Prerequisites

-   [NodeJS](https://nodejs.org/en/) 12.x
-   [Yarn](https://yarnpkg.com/lang/en/) 1.17.x
-   [Express](http://expressjs.com/) 4.17.x
-   [Jest](https://jestjs.io/) 24.9.x

## Initialization

To get started the application server execute the commands below in the project.

**YARN**
To execution with yarn don't forget of config the environment, NODE_ENV = development | homologation | production | test. (default: development)

```bash
yarn
yarn start
```

## Architecture

``` tree.md
.
├── [**\_\_tests\_\_**](./__tests__) => Module of application responsible for all test types.
│   ├── **coverage** => Report of tests.
│   ├── **integration** => Definition of integration testing scenarios.
│   ├── **unit** => Definition of unit testing scenarios.
│   └── **factory** => Definition of data model fakes to used in tests.
├── [**app**] => Module of application where applies bussines logic, authentication, and services.
├── [**api**] => Definition of components in yours respective routes, handlers and controllers.
├── [**assets**] => Modulo da aplicação para medias, documents e arquivos staticos.
├── [**config**] => Modulo da aplicação de configuração para plugins, rotas, serviços, banco de dados e autenticação.
├── [**database**] => Modulo responsavel para gerenciamento do banco de dados.
├── [**data**] => Definição de componentes e suas respectivas rotas, daos e controllers.
├── [**migrations**] => Definição de componentes e suas respectivas rotas, daos e controllers.
├── [**seeders**] => Definição de componentes e suas respectivas rotas, daos e controllers.
├── [**engine**] => Módulos responsáveis pela configuração e inicialização da aplicação.
├── [**database**] => Definição de componentes e suas respectivas rotas, daos e controllers.
│-   Conexão com banco.
│-   Configuração de logs.
│-   Serviços SOAP.
│-   Configuração do Swagger.
├── [**helper**] => Módulos responsáveis pela configuração e inicialização da aplicação.
├── [**docker-compose**] => Arquivo de inicialização.
├── [**ecosystem.config**] => Arquivo de inicialização.
└── [**server**] => Arquivo de inicialização.
```

## Components

Api's Architecture is divided in components, faciliting the maintenance of services.

Your struct is composed by:

-   **component**
    -   **handler** => Definição das rotas que irão trabalhar encima deste componente.
    -   **model** => Definição dos layouts (payloads) de entrada e saida de cada rota.
    -   **routes** => Definição de todos os parâmetros de entradas disponiveis para as rotas deste componente.
    -   **schema** => Definição de todos os parâmetros de resposta das rotas deste componente.

# TODO

-   [x] config docker postGis
-   [x] config pm2 deploy
-   [x] config dockerDB in Aws
-   [x] config CircleCI
-   [x] config notifications on slack
-   [x] config eslint
-   [x] config prettier
-   [x] config sequelize
-   [x] config jest
-   [x] create ddl tables
-   [x] config server and env config
-   [x] create middlware to load routes
-   [x] config logger
-   [x] create model and controller to mills
-   [x] create model and controller to harvests
-   [x] create model and controller to farms
-   [x] create model and controller to fields
-   [x] build factorys to tests
-   [x] create Mill
-   [x] create Harvest
-   [x] create Farm
-   [x] create Field
-   [ ] filter by name to mill
-   [ ] filter harvest startDate
-   [ ] filter harvest endDate
-   [ ] filter id and name farm
-   [ ] filter id field
-   [ ] create police to routes check fields

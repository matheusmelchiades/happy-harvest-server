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

-   **\_\_tests\_\_** => Module of application responsible for all test types.
    -   **coverage** => Report of tests.
    -   **integration** => Definition of integration testing scenarios.
    -   **unit** => Definition of unit testing scenarios.
    -   **factory** => Definition of data model fakes to used in tests.
-   **app** => Module of application where applies bussines logic, authentication, and services.
-   **api** => Definition of components in yours respective routes, handlers and controllers.
-   **assets** => Module of application save medias, documents and statics files.
-   **config** => Module of application to set configurations to plugins, routes, service, database and authentication.
-   **database** => Modulo responsavel para gerenciamento do banco de dados.
    -   **data** => Defintion of data to init application.
    -   **migrations** => Definition of DDL Database and validations in level database.
    -   **seeders** => Database's versioning definition.
-   **engine** => Module respective by configuration and launch All application.
    -   **database** => Definition of launcher database connections.
        -   **handlers** => Responsible file by configurations handler of database, ex: sequelize.
    -   Launch application.
    -   Launch Logger.
    -   Launch middlewares
    -   Launch routes.
-   **helper** => Responsible module by functions, algorithms and factorys used in all application.
-   **docker-compose** => Responsible file by database machine.
-   **ecosystem.config** => Responsible file by deploy's configurations.
-   **server** => boot file.

## Components

Api's Architecture is divided in components, faciliting the maintenance of services.

Your struct is composed by:

-   **component**
    -   **handler** => Layout's definition(body, payload) of input and output in route.
    -   **model** => Model definition to database access.
    -   **routes** => Route definition is gateway to validate params of avaible input to routes.
    -   **schema** => Layout's definition data Object to model access database.

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

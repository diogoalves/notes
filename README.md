# notes
A simple notes writing app using graphql.

This app uses:
- [prisma.io](https://www.prisma.io/docs/quickstart/) to provide database throught graphql service.
- [apollo-server v2](https://github.com/apollographql/apollo-server)
- react, material-ui and apollo-client in frontend

### deploying prisma backend with local postgres docker instance
```sh
$ cd backend/database
$ docker-compose up -d
$ prisma deploy 
```

### deploying prisma backend in remote demo server
in order to deploy first change "endpoint" key to '' in backend/database/prisma.yml. After that you should run:
```sh
$ cd backend
$ npm install
$ prisma deploy 
```

### running local dev graphql server and react code
```sh
$ cd backend
$ npm run dev
```
this command will initialize [local](http://localhost:4000) apollo-server server on port 4000 and [playground](http://localhost:5000) on port 5000.


in another shell start the frontend code
```sh
$ cd frontend
$ npm install
$ npm start
```

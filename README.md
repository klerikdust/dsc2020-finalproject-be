# Covid Tracker API
A CRUD-based application programming interface. This project was purposely made as the requirement of DSC Binus Backend Final Project 2020.
___
## How to install?
1.  Clone to repo
2.  Make sure you've installed nodejs `v12.x.x` or above.
3.  Create a new `.env` file in the root directory and fill it with template below as reference.
```env
# Remember, this project uses mysql2 as its data storage.
# Fill with your database's host.
DB_HOST=<>
# The user to access the database.
DB_USER=<>
# The password used to access the database. This is optional and you can ommit it if your database doesn't use any password.
DB_PASS=<>
# The target database.
DB_NAME=<>
# The target port for the application (not database). If you leave it blank, it will use port 3000 as the default.
PORT=<>
# The required key for accessing the API.
API_KEY=<>
```
4. Run `npm install`
5. Run `npm install knex -g` (This will be used to migrate the premade table). 
6. Run `knex migrate:latest`
7. And lastly, run `npm start` to start the API server.

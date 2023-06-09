# mern-test

`01-init-server`

- init package.json and check fields
- install peckages

```
npm init -y
npm i express dotenv bcrypt cors morgan mongoose colors
npm i nodemon -D
```

- add .gitignore, .env
- init server, connect to MongoDB, logging

`02-refactoring`

- uninstall colors

```
npm uninstall colors
```

- refactoring: app settings->app.js
- create mongoose model Post
- create routes/posts.js

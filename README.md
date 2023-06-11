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

`03-controllers-helpers`

- create helpers handleMongooseError, HttpError, ctrlWrapper
- create posts controllers

`04-image-to-file`

```
npm i multer nanoid
```

- create folders temp, public/images +.gitkeep
- add middleware multerUpload, rename file
- upload -> tempFolder -> public/images

`05-cloudinary-storage`

```
npm i cloudinary
```

-create base cloudinary config, connection and upload

`06-storages-refactoring`

- create services for app and cloudinary storages

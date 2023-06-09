import mongoose from 'mongoose';

import app from './app.js';

const { PORT, DB_HOST } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Connection failed: ${error.message}`);
    process.exit(1);
  });

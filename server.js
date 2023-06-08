import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import 'colors';

// In an ES module, you cannot use __dirname.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { PORT, DB_HOST } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(
  morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'server.log')),
  })
);

app.get('/', (req, res) => {
  res.json({ message: 'Get request' });
});

// Sets strictQuery mode for schemas.
// Set `strictQuery` to `true` to omit unknown fields in queries.
mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`.yellow.italic);
    });
  })
  .catch((error) => {
    console.log(`Connection failed: ${error.message}`.red.italic);
    process.exit(1);
  });

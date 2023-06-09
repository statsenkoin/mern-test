import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

import { router as postRouter } from './routes/posts.js';

// In an ES module, you cannot use __dirname.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(
  morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'server.log')),
  })
);

app.use('/api/posts', postRouter);
// app.get('/', (req, res) => {
//   res.json({ message: 'Get request' });
// });

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;

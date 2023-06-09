import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import 'dotenv/config';
import path from 'path';

import { router as postRouter } from './routes/posts.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(
  morgan('combined', {
    stream: fs.createWriteStream(path.join(process.cwd(), 'server.log')),
  })
);
// ============================================
// const tempDir = path.join(__dirname, 'temp');
// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });
// ============================================

// routes
app.use('/api/posts', postRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;

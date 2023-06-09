import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';

const tempDir = path.join(process.cwd(), 'temp');

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, nanoid() + '_' + file.originalname);
  },
});

const multerUpload = multer({
  storage: multerConfig,
});

export default multerUpload;

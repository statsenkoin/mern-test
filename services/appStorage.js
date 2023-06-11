import fs from 'fs/promises';
import path from 'path';

const imageDir = path.join(process.cwd(), 'public', 'images');

const saveImage = async (tempUpload, filename) => {
  const resultUpload = path.join(imageDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const imagePath = path.join('public', 'images', filename);

  return imagePath;
};

const removeImage = async (post) => {
  await fs.unlink(post.imagePath);
};

const appStorage = { saveImage, removeImage };
export default appStorage;

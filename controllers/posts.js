import fs from 'fs/promises';
import path from 'path';

import Post from '../models/post.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';

// =====================================================
// const cloudinary = require('cloudinary').v2;
import cloudinary from 'cloudinary';
// CLOUDINARY_API_KEY=894973229482847
// CLOUDINARY_SECRET_KEY=CIXo3ayG1wPxbI_5_8M0BTGuTUo
// CLOUDINARY_CLOUD_NAME=dmrnrkgjn
cloudinary.config({
  cloud_name: 'dmrnrkgjn',
  api_key: '894973229482847',
  api_secret: 'CIXo3ayG1wPxbI_5_8M0BTGuTUo',
});
// =====================================================

const imageDir = path.join(process.cwd(), 'public', 'images');

const getAll = async (req, res, next) => {
  const posts = await Post.find();
  res.json(posts);
};

const createPost = async (req, res, next) => {
  const { path: tempUpload, filename } = req.file;
  console.log('req.file :>> ', req.file);

  // Cloudinary storage ========================================
  const fileData = await cloudinary.v2.uploader.upload(
    tempUpload,
    { folder: 'posts' },
    function (error, result) {
      console.log(result);
    }
  );
  await fs.unlink(tempUpload);
  const imagePath = fileData.url;
  // =====================================================

  // app storage =========================================
  // const { path: tempUpload, filename } = req.file;
  // const resultUpload = path.join(imageDir, filename);
  // await fs.rename(tempUpload, resultUpload);
  // const imagePath = path.join('public', 'images', filename);

  // =====================================================
  const newPost = { ...req.body, imagePath };
  const post = await Post.create(newPost);
  res.status(201).json(post);
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  if (!post) {
    throw HttpError(404, 'Post not found');
  }
  res.json({ message: 'Post deleted' });
};

const ctrlPosts = {
  getAll: ctrlWrapper(getAll),
  createPost: ctrlWrapper(createPost),
  deletePost: ctrlWrapper(deletePost),
};
export default ctrlPosts;

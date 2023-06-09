import fs from 'fs/promises';
import path from 'path';

import Post from '../models/post.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';

const imageDir = path.join(process.cwd(), 'public', 'images');

const getAll = async (req, res, next) => {
  const posts = await Post.find();
  res.json(posts);
};

const createPost = async (req, res, next) => {
  const { path: tempUpload, filename } = req.file;
  const resultUpload = path.join(imageDir, filename);
  await fs.rename(tempUpload, resultUpload);
  //   const imagePath = path.join('public', 'images', filename);
  const imagePath = path.join('public', 'images', filename);

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

import Post from '../models/post.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';

import appStorage from '../services/appStorage.js';
import cloudinaryStorage from '../services/cloudinaryStorage.js';

const getAll = async (req, res, next) => {
  const posts = await Post.find();
  res.json(posts);
};

const createPost = async (req, res, next) => {
  const { path: tempUpload, filename } = req.file;
  // storage ==========================================
  // const imagePath = await appStorage.saveImage(tempUpload, filename);
  const imagePath = await cloudinaryStorage.saveImage(tempUpload);
  // ==================================================
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
  // storage ==========================================
  // await appStorage.removeImage(post);
  await cloudinaryStorage.removeImage(post);
  // ==================================================

  res.json({ message: 'Post deleted' });
};

const ctrlPosts = {
  getAll: ctrlWrapper(getAll),
  createPost: ctrlWrapper(createPost),
  deletePost: ctrlWrapper(deletePost),
};
export default ctrlPosts;

import Post from '../models/post.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';

const getAll = async (req, res, next) => {
  const result = await Post.find();
  res.json(result);
};

const createPost = async (req, res, next) => {
  const result = await Post.create(req.body);
  res.status(201).json(result);
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const result = await Post.findByIdAndDelete(id);
  if (!result) {
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

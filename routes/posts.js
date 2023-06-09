import { Router } from 'express';
import Post from '../models/post.js';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await Post.find();
    if (!result.length) {
      res.json({ message: 'DB is empty' });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await Post.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Post.findByIdAndDelete(id);

    if (!result) {
      const error = new Error('Post not found');
      error.status = 404;
      throw error;
    }

    res.json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
});

export { router };

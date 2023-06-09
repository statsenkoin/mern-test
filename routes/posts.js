import { Router } from 'express';
import ctrlPosts from '../controllers/posts.js';

const router = new Router();

router.get('/', ctrlPosts.getAll);

router.post('/', ctrlPosts.createPost);

router.delete('/:id', ctrlPosts.deletePost);

export { router };

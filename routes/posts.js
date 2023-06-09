import { Router } from 'express';

import ctrlPosts from '../controllers/posts.js';
import multerUpload from '../middlewares/multerUpload.js';

const router = new Router();

router.get('/', ctrlPosts.getAll);

router.post('/', multerUpload.single('image'), ctrlPosts.createPost);

router.delete('/:id', ctrlPosts.deletePost);

export { router };

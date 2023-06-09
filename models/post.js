import { Schema, model } from 'mongoose';
import handleMongooseError from '../helpers/handleMongooseError.js';

const postDbSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set post title'],
    },
    description: {
      type: String,
      default: 'No description',
    },
    imagePath: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

postDbSchema.post('save', handleMongooseError);

const Post = model('Post', postDbSchema);

export default Post;

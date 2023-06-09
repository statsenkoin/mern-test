import { Schema, model } from 'mongoose';

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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const handleMongooseError = (error, data, next) => {
  error.status = 400;
  next();
};

postDbSchema.post('save', handleMongooseError);

const Post = model('Post', postDbSchema);

export default Post;

import fs from 'fs/promises';
import cloudinary from 'cloudinary';
import HttpError from '../helpers/HttpError.js';

const { CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY, CLOUDINARY_CLOUD_NAME } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET_KEY,
});

const saveImage = async (tempUpload) => {
  const fileData = await cloudinary.v2.uploader.upload(
    tempUpload,
    { folder: 'posts' },
    function (error, result) {
      if (error) {
        throw HttpError(400, `Image not uploaded. ${error.message}`);
      }
      console.log('Image uploaded successfully');
    }
  );
  await fs.unlink(tempUpload);

  const { public_id, format } = fileData;
  const imagePath = public_id + '.' + format;
  return imagePath;
};

const removeImage = async ({ imagePath }) => {
  const id = imagePath.split('.')[0];
  cloudinary.v2.uploader.destroy(id).then((result) => console.log(result));
};

const cloudinaryStorage = { saveImage, removeImage };
export default cloudinaryStorage;

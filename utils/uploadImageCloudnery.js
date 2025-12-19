import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageCloudinary = (file, folderPath = "products") => {
  if (!file || !file.buffer) throw new Error("Image buffer missing");

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: folderPath }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(file.buffer);
  });
};

export default uploadImageCloudinary;

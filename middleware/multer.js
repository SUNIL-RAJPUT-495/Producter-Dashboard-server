import multer from "multer";

const storage = multer.memoryStorage(); // store files in RAM for Cloudinary
const upload = multer({ storage });

export default upload;

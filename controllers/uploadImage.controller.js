import uploadImageCloudinary  from "../utils/uploadImageCloudnery.js";

const uploadImageController = async (req, res) => {
  try {
    const file = req.file;
    const folder = req.body.folder || "products";

    if (!file) return res.status(400).json({ message: "No file provided" });

    const uploadedImage = await uploadImageCloudinary(file, folder);

    res.status(200).json({
      message: "Upload done",
      success: true,
      error: false,
      data: {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
        folder,
      },
    });
  
    
  } catch (err) {
    console.error("UPLOAD ERROR 👉", err);
    res.status(500).json({ message: err.message, success: false, error: true });
  }
};

export default uploadImageController;

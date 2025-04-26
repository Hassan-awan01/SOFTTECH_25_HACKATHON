const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = require("../config");
// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

// Set up Cloudinary storage with multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Ensure userId exists; fall back to "anonymous" if not
    const userId = req.user?.id || "anonymous";

    return {
      folder: `items/${userId}`,
      allowed_formats: ["jpg", "jpeg", "png"],
      transformation: [{ width: 800, height: 800, crop: "limit" }],
    };
  },
});

// Set up multer parser with Cloudinary storage
const parser = multer({ storage });

function getPublicIdFromUrl(url) {
  try {
    const urlParts = url.split("/");
    const uploadIndex = urlParts.findIndex((part) => part === "upload");

    if (uploadIndex === -1) {
      throw new Error("Invalid Cloudinary URL format.");
    }

    const relevantParts = urlParts.slice(uploadIndex + 2);
    return relevantParts.join("/").split(".")[0];
  } catch (error) {
    console.error("Error extracting public ID:", error);
    throw new Error("Failed to extract public ID.");
  }
}

// Function to delete an image from Cloudinary by its URL
async function deleteImage(imageUrl) {
  try {
    const publicId = getPublicIdFromUrl(imageUrl);

    if (!publicId) {
      throw new Error("No valid public ID found in the image URL.");
    }

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(publicId);
    console.log(`Successfully deleted image with public ID: ${publicId}`);

    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image.");
  }
}

module.exports = {
  parser, // Export multer parser for handling image uploads
  deleteImage, // Export the delete image function
  getPublicIdFromUrl, // Export the public ID extraction function
};

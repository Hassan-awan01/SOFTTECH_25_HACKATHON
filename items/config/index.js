require("dotenv").config();

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/auth-service";
const PORT = process.env.PORT || 3003;
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
module.exports = {
  DB_URL,
  PORT,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
};

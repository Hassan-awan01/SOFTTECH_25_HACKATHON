require("dotenv").config();

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/auth-service";
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

module.exports = {
  DB_URL,
  PORT,
  JWT_SECRET,
};

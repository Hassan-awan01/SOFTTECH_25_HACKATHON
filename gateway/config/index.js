require("dotenv").config();
const PORT = process.env.PORT || 3000;
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:3002";
const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || "http://localhost:3001";
const ITEM_SERVICE_URL =
  process.env.ITEM_SERVICE_URL || "http://localhost:3003";
const MESSAGE_SERVICE_URL =
  process.env.MESSAGE_SERVICE_URL || "http://localhost:3004";
const NOTIFICATION_SERVICE_URL =
  process.env.NOTIFICATION_SERVICE_URL || "http://localhost:3005";

module.exports = {
  PORT,
  USER_SERVICE_URL,
  AUTH_SERVICE_URL,
  ITEM_SERVICE_URL,
  MESSAGE_SERVICE_URL,
  NOTIFICATION_SERVICE_URL,
};

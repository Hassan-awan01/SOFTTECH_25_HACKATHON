const axios = require("axios");

const config = require("../config");
const AUTH_SERVICE_URL = config.AUTH_SERVICE_URL || "http://localhost:3001";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Authentication token is required",
    });
  }

  try {
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/api/auth/verify`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    req.user = response.data.user;
    req.headers["x-user-id"] = response.data.user.id;

    next();
  } catch (error) {
    console.error("Auth token verification failed:", error.message);

    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    return res.status(401).json({
      error: "Unauthorized",
      message: "Invalid or expired authentication token",
    });
  }
};

module.exports = authMiddleware;

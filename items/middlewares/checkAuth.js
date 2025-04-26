// middlewares/verifyAuth.js
const axios = require("axios");

module.exports = async function checkAuth(req, res, next) {
  const token = req.header("Authorization");
  console.log("Token:", token);
  const url = "http://localhost:3001";
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const response = await axios.post(
      `${url}/api/auth/verify-token`,
      {},
      {
        headers: { Authorization: token },
      }
    );

    if (response.data.authenticated) {
      req.user = response.data.user; // Attach user to request
      return next();
    }

    return res.status(401).json({ error: "Unauthorized" });
  } catch (error) {
    return res.status(401).json({
      error: error.response?.data?.error || "Authentication failed",
    });
  }
};

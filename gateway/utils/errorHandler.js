const errorHandler = (err, req, res, next) => {
  console.error("API Gateway Error:", err);

  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err);
  }

  // Handle proxy errors
  if (err.code === "ECONNREFUSED") {
    return res.status(503).json({
      error: "Service Unavailable",
      message: "The requested service is currently unavailable",
      service: err.address,
    });
  }

  // Handle axios errors
  if (err.response) {
    return res.status(err.response.status).json(err.response.data);
  }

  // Generic error response
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong on our end",
  });
};

module.exports = errorHandler;

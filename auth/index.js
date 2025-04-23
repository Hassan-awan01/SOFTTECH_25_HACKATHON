const express = require("express");
const cors = require("cors");
const { databaseConnection } = require("./database");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");
const config = require("./config");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
databaseConnection()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.use("/api/auth", authRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "auth-service" });
});

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = config.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth server is running on port ${PORT}`);
});

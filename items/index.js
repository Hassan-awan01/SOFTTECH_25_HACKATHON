const express = require("express");
const cors = require("cors");
const { databaseConnection } = require("./database");
const itemRoutes = require("./routes/items");
const errorHandler = require("./middlewares/errorHandler");
const config = require("./config");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Database connection
databaseConnection()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.use("/api/items", itemRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "item-service" });
});

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Auth server is running on port ${PORT}`);
});

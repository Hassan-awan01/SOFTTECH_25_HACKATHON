const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const proxy = require("express-http-proxy");
const config = require("./config");
const errorHandler = require("./utils/errorHandler");

const routes = require("./routes").routes;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API Gateway is running!");
});

routes.forEach((route) => {
  app.use(
    route.url,
    proxy(route.serviceUrl, {
      proxyReqPathResolver: (req) => {
        return `${route.url}${req.url}`;
      },
    })
  );
});
app.use(errorHandler);
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

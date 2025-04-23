const config = require("../config");

const routes = [
  {
    url: "/api/auth",
    serviceUrl: config.AUTH_SERVICE_URL,
  },
  {
    url: "/api/users",
    serviceUrl: config.USER_SERVICE_URL,
  },
  {
    url: "/api/items",
    serviceUrl: config.ITEM_SERVICE_URL,
  },
  {
    url: "/api/messages",
    serviceUrl: config.MESSAGE_SERVICE_URL,
  },
  {
    url: "/api/notifications",
    serviceUrl: config.NOTIFICATION_SERVICE_URL,
  },
];

exports.routes = routes;

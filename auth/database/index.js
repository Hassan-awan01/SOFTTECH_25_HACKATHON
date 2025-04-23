const UserRepository = require("./repositories/UserRepository");

module.exports = {
  databaseConnection: require("./databaseConnection"),
  UserRepository: require("./repositories/UserRepository"),
};

const {Router} = require("express");
const routes = Router();

const usersRouter = require("./user.routes");

routes.use("/users", usersRouter);

module.exports = routes;
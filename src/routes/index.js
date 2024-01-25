const {Router} = require("express");
const routes = Router();

const usersRouter = require("./user.routes");
const sessionsRouter = require("./sessions.routes");

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

module.exports = routes;
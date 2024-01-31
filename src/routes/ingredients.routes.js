const {Router} = require("express");
const ingredientsRoutes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


const IngredientsController = require("../controllers/ingredientsController");
const ingredientsController = new IngredientsController()

ingredientsRoutes.get("/", ensureAuthenticated, ingredientsController.index);

module.exports = ingredientsRoutes;
const Router = require("express");
const dishesRoutes = Router();

const DishesController = require("../controllers/dishesController");
const dishesController = new DishesController();

dishesRoutes.post("/", dishesController.create);

module.exports = dishesRoutes;
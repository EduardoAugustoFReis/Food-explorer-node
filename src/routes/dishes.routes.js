const Router = require("express");
const dishesRoutes = Router();

const DishesController = require("../controllers/dishesController");
const dishesController = new DishesController();

dishesRoutes.post("/:user_id", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.put("/:id", dishesController.update);

module.exports = dishesRoutes;
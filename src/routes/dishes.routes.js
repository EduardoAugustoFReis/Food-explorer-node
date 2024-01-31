const Router = require("express");
const dishesRoutes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const DishesController = require("../controllers/dishesController");
const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.put("/:id", dishesController.update);

module.exports = dishesRoutes;
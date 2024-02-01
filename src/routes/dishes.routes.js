const Router = require("express");
const dishesRoutes = Router();

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const upload = multer(uploadConfig.MULTER);

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const DishesAvatarController = require("../controllers/dishAvatarController");
const dishesAvatarController = new DishesAvatarController();

const DishesController = require("../controllers/dishesController");
const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.put("/:id", dishesController.update);
dishesRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), dishesAvatarController.update);

module.exports = dishesRoutes;
const Router = require("express");
const dishesRoutes = Router();

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const upload = multer(uploadConfig.MULTER);

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const DishesController = require("../controllers/dishesController");
const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", verifyUserAuthorization("admin"),upload.single("image"), dishesController.create);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", verifyUserAuthorization("admin"), dishesController.delete);
dishesRoutes.patch("/:id", verifyUserAuthorization("admin"), upload.single("image"),dishesController.update);

module.exports = dishesRoutes;
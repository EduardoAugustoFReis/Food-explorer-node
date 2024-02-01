const knex = require("../database/knex");
const AppError = require("../utils/appError");
const DiskStorage = require("../providers/DiskStorage");

class DishesAvatarController{
  
  async update(request, response){
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishes").where( {created_by: user_id} ).first();

    if(!dish){
      throw new AppError("Somente usuários autenticados podem mudar a imagem.", 401);
    }

    if(dish.image){
      await diskStorage.deleteFile(dish.image);
    }

    const filename = await diskStorage.saveFile(avatarFilename);
    dish.image = filename;
    
    await knex("dishes").update(dish).where({created_by: user_id});

    return response.json(dish);
  }

}

module.exports = DishesAvatarController;
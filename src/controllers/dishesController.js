const knex = require("../database/knex");

class DishesController{

  async create(request, response){
    const {name, category, ingredients, price, description} = request.body;

    return response.status(201).json({name, category, ingredients, price, description})
  }
}
module.exports = DishesController;
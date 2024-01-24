const AppError = require("../utils/appError");
const knex = require("../database/knex");
const {hash} = require("bcryptjs");

class UserController{

  async create(request, response){
    const {name, email, password} = request.body;

    const checkUserExists = await knex("users").where({email}).first();

    if(checkUserExists){
      throw new AppError("Este e-mail já está em uso!");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({name, email, password: hashedPassword});
    
    return response.status(201).json();
  }

}

module.exports = UserController;
const AppError = require("../utils/appError");

class UserController{

  create(request, response){
    const {name, email, password} = request.body;

    if(!name){
      throw new AppError("Nome não informado!");
    }
    
    return response.json( {name, email, password} )
  }

}

module.exports = UserController;
const AppError = require("../utils/appError");

function verifyUserAuthorization(roleToVerify){
  return (request, response, next) =>{
    const {role} = request.user;
    
    if(role !== roleToVerify){
      throw new AppError("Somente o adminstrador pode fazer alterações", 401);
    }
    return next();
  }
}

module.exports = verifyUserAuthorization;
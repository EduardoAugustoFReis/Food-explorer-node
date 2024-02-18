const {verify} = require("jsonwebtoken");
const AppError = require("../utils/appError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next){
  const authHeader = request.headers.authorization; // token de autorização fica no header

  if(!authHeader){
    throw new AppError("JWT Token não informado.", 401);
  }

  const [, token] = authHeader.split(" "); // barer (token)

  try{
    const {role, sub: user_id} = verify(token, authConfig.jwt.secret); // verifica se é um token válido

    request.user = { // nova requisição criada 
      id: Number(user_id), // parse para number o conteúdo do token
      role
    }

    return next();
  } catch {
    throw new AppError("JWT Token inválido.", 401);
  }
}

module.exports = ensureAuthenticated;
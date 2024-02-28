
# Desafio final Food Explorer

Sobre o projeto:

O projeto consiste em um cardápio virtual para um restaurante.

Site criado utilizando Node.js na parte back-end da aplicação. 


## Funcionalidades da aplicação

- Login e cadastro 
- Filtar pratos pelo nome
- Criação de novos pratos (disponível apenas para administradores)
- Editar pratos criados  (disponível apenas para administradores)
- Excluir pratos criados  (disponível apenas para administradores)
- Mostrar detalhes do prato criado

## Tecnológias utilizadas

- Node.js
- Express.js
- ExpressJS Async Errors
- Knex.js
- SQLite
- Bcryptjs
- Multer
- JSON Web Token
- CORS
- PM2
- Dotenv



## Utilização

.Para este projeto estou utilizando hospedagem do site Render, logo pode ocorrer atrasos na aplicação.

.Você pode consumir a aplicação criada em sua própria máquina, mas precisa realizar alguns passos primeiro.





Git clone do projeto
```bash
  $ git clone https://github.com/EduardoAugustoFReis/Food-explorer-node.git
```
Verifique se está na pasta do projeto, utilize o comando seguinte para entrar na pasta
```bash
  cd food-explorer-back
```
Assim que fazer o git clone do projeto
```bash
  npm install 
```
Para o banco de dados
```bash
  npm run migrate 
```    
Para incialiar o servidor
```bash
  npm start 
``` 
## Link do deploy
Esse foi o gerado pelo Render no deploy da aplicação

https://foodexplorer-api-upu0.onrender.com




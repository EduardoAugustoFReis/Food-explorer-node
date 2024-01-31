const knex = require("../database/knex");
const AppError = require("../utils/appError");

class DishesController{

  async create(request, response){
    const {name, category, ingredients, price, description} = request.body;
    const user_id = request.user.id;

    const [dish_id] = await knex("dishes").insert({
      name,
      category,
      price,
      description,
      created_by: user_id,
      updated_by: user_id
    });

    const ingredientsInsert = ingredients.map((title) => {
      return{
        title,
        dish_id,
        created_by: user_id
      }
    })

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json();
  }

  async show(request, response){
    const {id} = request.params;

    const dishes = await knex("dishes").where( {id} ).first();
    const ingredients = await knex("ingredients").where( {dish_id: id} ).orderBy("title");

    return response.json({
      ...dishes,
      ingredients
    });
  }

  async delete(request, response){
    const {id} = request.params;

    await knex("dishes").where( {id} ).delete();

    return response.json();
  }

  async index(request, response){
    const {name, ingredients} = request.query;  
    const user_id = request.user.id;
    let dishes;

    if(ingredients){

      const filterIngredients = ingredients.split(",").map( (ingredient) => ingredient.trim());
      
      dishes = await knex("ingredients")
      .select([
        "dishes.id",
        "dishes.name",
        "dishes.created_by"
      ])
    .where("dishes.created_by", user_id)
    .whereLike("dishes.name",`%${name}%`)
    .whereIn("title", filterIngredients)
    .innerJoin("dishes", "dishes.id", "ingredients.dish_id")  
    .orderBy("dishes.name")
    }else{

       dishes = await knex("dishes")
      .where( {user_id} )
      .whereLike("name", `%${name}%`)
      .orderBy("name");
      
    }

    const dishesIngredient = await knex("ingredients");
    const dishesWithIngredients = dishes.map( (dish) =>{
      const dishIngredients = dishesIngredient.filter( ingredient => ingredient.dish_id === dish.id);

      return{
        ...dish,
        ingredients: dishIngredients
      }
    })
    
    return response.json(dishesWithIngredients);
  }

  async update(request, response){
    const {name, category, ingredients, price, description} = request.body;
    const {id} = request.params;

    const dish = await knex("dishes").where( {id} ).first();
    
    if(!dish){
      throw new AppError("Prato não encontrado.");
    }

    // atualizando os campos
    const fieldUpdated = {
      name: name ?? dish.name,
      description: description ?? dish.description,
      category: category ?? dish.category,
      price: price ?? dish.price,
      updated_at: knex.fn.now()
    }

    if (ingredients) { 
      await knex("ingredients").where({ dish_id: id }).delete();

      const ingredientsInsert = ingredients.map((title) => {
        return{
          title,
          dish_id: id,
          created_by: dish.created_by
        }
      })

      await knex("ingredients").insert(ingredientsInsert);
    }

    await knex("dishes").where( {id}).update(fieldUpdated);

    return response.json();
  }

}
module.exports = DishesController;
import { RecipeApi } from './api/recipeApi.js';
import { Recipe } from './models/recipe.js';
import { RecipeCard } from './template/RecipeCard.js';

const URL_ENDPOINT = '/assets/data/recipes.json';

/**
 * display the recipes
 * @param {Recipe[]} recipeArray 
 */
function renderRecipesCards (recipeArray) {
  recipeArray.forEach(recipe => {
    const recipeCard = new RecipeCard(recipe);

    document.querySelector('.recipe-list').append(recipeCard.render());
  });
}

/**
 * Function containing the main display logic for our page
 */
async function main () {
  const api = new RecipeApi(URL_ENDPOINT);
  const recipes = await api.getAllRecipeArray();
  const recipesArray = recipes.map(element => new Recipe(element));

  console.log(recipesArray);

  renderRecipesCards(recipesArray);
}

main();
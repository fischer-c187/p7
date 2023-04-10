import { RecipeApi } from './api/recipeApi.js';
import { Recipe } from './models/recipe.js';
import { RecipeCard } from './template/RecipeCard.js';
import { RecipeManager } from './models/managerRecipe.js';
import { SelectTag } from './manager/selectTag.js';
import { RecipeObserver } from './watch/recipeObserver.js';
import { SearchBar } from './manager/searchBar.js';
import config from './config/config.js';

/**
 * display the recipes
 * @param {Recipe[]} recipeArray 
 */
function renderRecipesCards (recipeArray) {
  recipeArray.forEach(recipe => {
    const recipeCard = new RecipeCard(recipe);

    document.querySelector(config.SELECTORS.containerListRecipe).append(recipeCard.render());
  });
}

/**
 * Function containing the main display logic for the page
 */
async function main () {
  const api = new RecipeApi(config.CONSTANTS.urlData);
  const recipes = await api.getAllRecipeArray();

  const recipesArray = recipes.map(element => new Recipe(element));
  renderRecipesCards(recipesArray);

  const manager = new RecipeManager(recipesArray);
  manager.updateData();

  const observer = new RecipeObserver();

  ['ingredients', 'appliance', 'ustensils'].map(type => {
    const selector = new SelectTag(type, manager);
    observer.subscribe(selector);
    return selector;
  });

  new SearchBar(config.SELECTORS.inputSearchRecipes, manager);
}

main();
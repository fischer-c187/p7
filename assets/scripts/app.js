import { RecipeApi } from './api/recipeApi.js';
import { Recipe } from './models/recipe.js';
import { RecipeCard } from './template/RecipeCard.js';
import { RecipeManager } from './models/managerRecipe.js';
import { SelectTag } from './manager/selectTag.js';
import { RecipeObserver } from './watch/recipeObserver.js';
import { SearchBar } from './manager/searchBar.js';

const URL_ENDPOINT = './assets/data/recipes.json';

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
  renderRecipesCards(recipesArray);

  const manager = new RecipeManager(recipesArray);
  manager.updateData();

  const observer = new RecipeObserver();
  observer.init();

  ['ingredients', 'appliance', 'ustensils'].map(type => {
    const selector = new SelectTag(type, manager);
    selector.init();
    observer.subscribe(selector);
    return selector;
  });

  const searchBar = new SearchBar('#search-recipe', manager);
  searchBar.init();
}

main();
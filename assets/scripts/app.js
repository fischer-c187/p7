import { RecipeApi } from './api/recipeApi.js';
import { Recipe } from './models/recipe.js';
import { RecipeCard } from './template/RecipeCard.js';
import { RecipeManager } from './models/managerRecipe.js';
import { SelectTag } from './manager/selectTag.js';
import { RecipeObserver } from './watch/recipeObserver.js';

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
  const inputSearch = document.querySelector('#search-recipe');

  inputSearch.addEventListener('input', (event) => {
    if(event.target.value.length >= 3){
      const allCards = document.querySelectorAll('.recipe');
      allCards.forEach(element => {
        if(!element.innerText.includes(event.target.value)) {
          element.classList.add('recipe--hidden');
        } else {
          element.classList.remove('recipe--hidden');
        }
      });
    } 
    else {
      const allCards = document.querySelectorAll('.recipe');
      allCards.forEach(element => {
        element.classList.remove('recipe--hidden');
      });
    }

  });


  const api = new RecipeApi(URL_ENDPOINT);
  const recipes = await api.getAllRecipeArray();

  const recipesArray = recipes.map(element => new Recipe(element));
  renderRecipesCards(recipesArray);

  const manager = new RecipeManager(recipesArray);
  manager.updateData();

  const observer = new RecipeObserver();

  ['ingredients', 'appliance', 'ustensils'].map(type => {
    const selector = new SelectTag(type, manager);
    selector.init();
    observer.subscribe(selector);
    return selector;
  });

  observer.init();

  

}

main();
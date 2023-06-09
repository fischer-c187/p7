import { FilterRecipe } from '../sorter/filterRecipe.js';
import config from '../config/config.js';
/**
 * class represent a manager for recipe data
 */
export class RecipeManager {
  #data;
  #recipes;
  /**
   * create an instance of RecipeManager
   * @param {Object[]} recipeArray array of recipe objects
   */
  constructor(recipeArray) {
    this.#recipes = recipeArray;
    this.#data = {
      ingredients: new Set(),
      appliance: new Set(),
      ustensils: new Set(),
    };
  }

  /**
   * update the value of this.#data when the dom of div.recipe change
   */
  updateData() {
    const recipeDisplayed = this.#getDisplayedRecipes();
    this.#cleanData();
    recipeDisplayed.forEach((article) => {
      const id = parseInt(article.dataset.id, 10);

      const recipe = this.#getRecipeCorrespondingId(id);
      this.#updateDataElement(recipe);
    });
  }

  /**
   * return all the recipe displayed
   * @returns [NodeList]
   */
  #getDisplayedRecipes() {
    return document.querySelectorAll(config.SELECTORS.recipeNotHidden);
  }

  /**
   * returns the recipe corresponding to the element
   * @param {Number} id id of recipe
   * @returns {Object}
   */
  #getRecipeCorrespondingId(id) {
    return this.#recipes.find((recipe) => recipe.id === id);
  }

  /**
   * add the value of set in this.#data with the value of recipe
   * @param {Object} recipe
   */
  #updateDataElement(recipe) {
    Object.keys(this.#data).forEach((key) => {
      this.#data[key] = new Set([...this.#data[key], ...recipe[key]]);
    });
  }

  /**
   * remove all data in this.#data
   */
  #cleanData() {
    Object.keys(this.#data).forEach((key) => {
      this.#data[key].clear();
    });
  }

  /**
   * performs a sorting of the recipes
   */
  filterRecipe() {
    FilterRecipe.filterAllTag(this.#recipes);
  }

  /**
   * getter for ingredients set
   */
  get ingredients() {
    this.updateData();
    return this.#data.ingredients;
  }

  /**
   * getter for applicance set
   */
  get appliance() {
    this.updateData();
    return this.#data.appliance;
  }

  /**
   * getter for ustensils set
   */
  get ustensils() {
    this.updateData();
    return this.#data.ustensils;
  }
}

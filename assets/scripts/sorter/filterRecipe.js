import config from '../config/config.js';

/**
 * FilterRecipe class for filtering recipes based on search criteria and tags.
 */
export class FilterRecipe {

  /**
   * Search filter for recipes when the input value is greater than or equal to 3.
   */
  static #searchFilter() {
    const inputSearch = document.querySelector(config.SELECTORS.inputSearchRecipes);
    if (inputSearch.value.length >= 3) {
      const regexSearch = new RegExp(inputSearch.value, 'i');
      this.#getNotHiddenRecipe()
        .forEach((element) => {
          this.#setClassRecipe(regexSearch.test(element.innerText), element);
        });
    }
  }

  /**
   * Helper method to check if an array contains all elements of another array.
   *
   * @param {Array} array - The main array.
   * @param {Array} arrayValue - The array of values to check.
   * @returns {boolean} - True if the main array contains all elements of the other array, false otherwise.
   */
  static #arrayContainOtherArray(array, arrayValue) {
    return arrayValue
      .every(value => {
        const regexTag = new RegExp(value, 'i');
        return array.some(element => regexTag.test(element));
      });
  }

  /**
   * Get all selected tags.
   *
   * @returns {Object} - An object containing all the selected tags.
   */
  static #getAllTag() {
    const tagFilter = Array.from(document.querySelectorAll(config.SELECTORS.tagList));
    const allTag = {};
    
    tagFilter.forEach((filter) => {
      allTag[filter.dataset.type] = Array.from(filter.querySelectorAll('li')).map((element) => element.innerText);
    });

    return allTag;
  }

  /**
   * Make all recipes visible.
   */
  static #allRecipeVisible() {
    document
      .querySelectorAll(config.SELECTORS.recipe)
      .forEach((element) => element.classList.remove(config.CLASS.hiddenRecipe));
  }

  /**
   * Get the recipe object corresponding to the provided ID.
   *
   * @param {number} id - The ID of the recipe.
   * @param {Array} recipes - The array of recipes.
   * @returns {Object} - The recipe object with the provided ID.
   */
  static #getRecipeCorrespondingId = (id, recipes) => {
    return recipes.find((recipe) => recipe.id === id);
  };

  /**
   * Get all recipes that are not hidden.
   *
   * @returns {NodeListOf<Element>} - A NodeList of recipe elements that are not hidden.
   */
  static #getNotHiddenRecipe(){
    return document
      .querySelectorAll(config.SELECTORS.recipeNotHidden);
  }

  /**
   * Set or remove the 'recipe--hidden' class based on the provided condition.
   *
   * @param {boolean} condition - The condition to apply the class.
   * @param {Element} element - The recipe element.
   */
  static #setClassRecipe (condition, element) {
    element.classList.toggle(config.CLASS.hiddenRecipe, !condition);
  }

  /**
   * calculates the average time per search
   * @param {Array Object} timeArray array with PerformanceEntry object
   * @returns {Number}
   */
  static #averageTimeperSearch(timeArray) {
    return Math.round(timeArray
      .reduce((acc, value) => acc + value.duration, 0)/timeArray.length);
  }

  /**
   * Filter recipes based on all the selected tags.
   *
   * @param {Array} arrayRecipe - The array of recipes.
   */
  static filterAllTag(arrayRecipe) {
    this.#allRecipeVisible();
    const allTag = this.#getAllTag();
    this.#searchFilter();
    this.#getNotHiddenRecipe()
      .forEach((element) => {
        const recipe = this.#getRecipeCorrespondingId(Number(element.dataset.id), arrayRecipe);

        const isVisible = Object.keys(allTag).every( key => {
          return this.#arrayContainOtherArray(recipe[key], allTag[key]);
        });
        this.#setClassRecipe(isVisible, element);
      });
  }
}

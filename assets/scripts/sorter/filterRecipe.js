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
      for(let element of this.#getNotHiddenRecipe()){
        this.#setClassRecipe(element.innerText.toLowerCase().includes(inputSearch.value.toLowerCase()), element);
      }
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
    for(let value of arrayValue){
      let contain = false;
      for(let element of array){
        if(element.toLowerCase() === value.toLowerCase()){
          contain = true;
        }
      }
      if(!contain){
        return false;
      }
    }
    return true;
  }

  /**
   * Get all selected tags.
   *
   * @returns {Object} - An object containing all the selected tags.
   */
  static #getAllTag() {
    const tagFilter = Array.from(document.querySelectorAll(config.SELECTORS.tagList));
    const allTag = {};
    for(let filter of tagFilter){
      allTag[filter.dataset.type] = [];
      for(let element of filter.querySelectorAll('li')){
        allTag[filter.dataset.type].push(element.innerText);
      }
    }

    return allTag;
  }

  /**
   * Make all recipes visible.
   */
  static #allRecipeVisible() {
    for(let element of document.querySelectorAll(config.SELECTORS.recipe)){
      element.classList.remove(config.CLASS.hiddenRecipe);
    }

  }

  /**
   * Get the recipe object corresponding to the provided ID.
   *
   * @param {number} id - The ID of the recipe.
   * @param {Array} recipes - The array of recipes.
   * @returns {Object} - The recipe object with the provided ID.
   */
  static #getRecipeCorrespondingId = (id, recipes) => {
    for (let recipe of recipes) {
      if (recipe.id === id){
        return recipe;
      }
    }
    // return recipes.find((recipe) => recipe.id === id);
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
   * Counts the number of visible recipes on the page.
   * 
   * @return {number} The number of visible recipes.
   */
  static #countRecipeVisible() {
    return document.querySelectorAll(config.SELECTORS.recipeNotHidden).length;
  }

  /**
   * Creates an error message element to indicate that no recipes match the given criteria.
   * 
   * @return {HTMLParagraphElement} The paragraph containing the error message.
   */
  static #createErrorMessage() {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add(config.CLASS.NoRecipeErrorMessage);
    errorMessage.innerText = config.CONSTANTS.errorMessage;

    return errorMessage;
  }

  /**
   * Displays the error message to indicate that no recipes match the given criteria.
   */
  static #displayNoRecipeErrorMessage() {
    document.querySelector(config.SELECTORS.containerListRecipe)
      .prepend(this.#createErrorMessage());
  }

  /**
   * Removes the error message indicating that no recipes match the given criteria, if present.
   */
  static #removeNoRecipeErrorMessage() {
    const errorMessage = document.querySelector(config.SELECTORS.NoRecipeErrorMessage);
    if(errorMessage) {
      errorMessage.remove();
    }
  }

  /**
   * Filter recipes based on all the selected tags.
   *
   * @param {Array} arrayRecipe - The array of recipes.
   */
  static filterAllTag(arrayRecipe) {
    this.#removeNoRecipeErrorMessage();
    this.#allRecipeVisible();
    const allTag = this.#getAllTag();
    this.#searchFilter(); 
    for(let element of this.#getNotHiddenRecipe()){
      const recipe = this.#getRecipeCorrespondingId(Number(element.dataset.id), arrayRecipe);

      let isVisible = true;
      for(let key of Object.keys(allTag)){
        if(!this.#arrayContainOtherArray(recipe[key], allTag[key])){
          isVisible = false;
        }
      }
      this.#setClassRecipe(isVisible, element);
    }
    if(this.#countRecipeVisible() === 0) {
      this.#displayNoRecipeErrorMessage();
    }
  }
}

/**
 * SearchBar class for handling user input and filtering the recipe list.
 */
export class SearchBar {
  #searchInput;
  #managerRecipe;

  /**
   * Constructor for SearchBar.
   *
   * @param {string} inputSelector - The CSS selector for the input element.
   * @param {Object} dataManager - The data manager for filtering recipes.
   */
  constructor(inputSelector, dataManager){
    this.#searchInput = document.querySelector(inputSelector);
    this.#managerRecipe = dataManager;
    this.#handleInputSearch();
  }

  /**
   * Handles input events on the search input element and filters the recipe list.
   */
  #handleInputSearch(){
    this.#searchInput.addEventListener('input', (event) => {
      this.#managerRecipe.filterInput(event.target.value);
    });
  }
}
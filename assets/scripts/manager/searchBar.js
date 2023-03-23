export class SearchBar {
  #searchInput;
  #managerRecipe;

  constructor(inputSelector, dataManager){
    this.#searchInput = document.querySelector(inputSelector);
    this.#managerRecipe = dataManager;
  }

  #handleInputSearch(){
    this.#searchInput.addEventListener('input', (event) => {
      this.#managerRecipe.filterInput(event.target.value);
    });
  }

  init() {
    this.#handleInputSearch();
  }

}
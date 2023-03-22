export class FilterRecipe {
  static #searchFilter() {
    const inputSearch = document.querySelector('#search-recipe');
    if (inputSearch.value.length >= 3) {
      const allCards = this.#getNotHiddenRecipe();

      allCards.forEach((element) => {
        this.#setClassRecipe(element.innerText.includes(inputSearch.value), element);
      });
    }
  }

  static filterByTag = (type, value, arrayRecipe) => {
    this.#getNotHiddenRecipe()
      .forEach((article) => {
        const id = parseInt(article.dataset.id, 10);
        const recipe = this.#getRecipeCorrespondingId(id, arrayRecipe);

        this.#setClassRecipe(recipe[type].includes(value), article);
      });
  };

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

  static #arrayContainOtherArray(array, arrayValue) {
    return arrayValue.every((value) => array.includes(value));
  }

  static #getAllTag() {
    const tagFilter = Array.from(document.querySelectorAll('.tag-list'));
    const allTag = {};

    tagFilter.forEach((filter) => {
      allTag[filter.dataset.type] = Array.from(
        filter.querySelectorAll('li')
      ).map((element) => element.innerText);
    });

    return allTag;
  }

  static #allRecipeVisible() {
    document
      .querySelectorAll('.recipe')
      .forEach((element) => element.classList.remove('recipe--hidden'));
  }

  static #getRecipeCorrespondingId = (id, recipes) => {
    return recipes.find((recipe) => recipe.id === id);
  };

  static #getNotHiddenRecipe(){
    return document
      .querySelectorAll('.recipe:not(.recipe--hidden)');
  }

  static #setClassRecipe (condition, element) {
    element.classList.toggle('recipe--hidden', !condition);
  }
}

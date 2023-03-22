/**
 * Class representing a recipe card.
 */
export class RecipeCard {

  #wrapper;

  /**
   * Create a new instance of the RecipeCard class.
   * @param {Recipe} recipe - A Recipe object.
   */
  constructor(recipe) {
    this.recipe = recipe;

    this.#wrapper = document.createElement('article');
    this.#wrapper.classList.add('recipe');
    this.#wrapper.setAttribute('data-id', this.recipe.id);
  }

  /**
   * Set the text content of an element inside the wrapper.
   * @param {string} selector - CSS selector for the element.
   * @param {string} value - The text content to set.
   * @private
   */
  #setTextElement(selector, value) {
    this.#wrapper.querySelector(selector).innerText = value;
  }


  /**
   * Create a list element for the ingredients.
   * @returns {HTMLElement[]} An array of list elements for the ingredients.
   * @private
   */
  #makeIngredientsListElement() {

    const listElements = this.recipe.ingredients.map((ingredient, index) => {

      const list = document.createElement('li');
      list.classList.add('recipe__ingredient-item');
      list.innerHTML = '<strong class="recipe__ingredient-name"></strong>';
      
      // sometimes we have no quantity
      list.querySelector('.recipe__ingredient-name')
        .innerText = this.recipe.quantity[index] ? `${ingredient}: ` : ingredient;

      const quantity = document.createTextNode(this.recipe.quantity[index]);
      list.append(quantity);

      return list;
    });

    return listElements;
  }

  /**
   * Render the ingredients list.
   * @private
   */
  #renderIngredientsList () {
    this.#makeIngredientsListElement().forEach((element) => {
      this.#wrapper.querySelector('.recipe__ingredients-list').append(element);
    });
  }

  /**
   * Render the recipe card.
   * @returns {HTMLElement} The rendered recipe card element.
   */
  render() {
    const card = `
      <aside class="recipe__container-img">
        <img src="${this.recipe.img}" alt="recipe illustration" class="recipe__img">
      </aside>
      <div class="recipe__description">
        <header class="recipe__info">
          <h2 class="recipe__name"></h2>
          <p class="recipe__time">
            <i class="fa-regular fa-clock"></i>
            <span> </span> min
          </p>
        </header>
        <div class="recipe__instructions">
          <ul class="recipe__ingredients-list"></ul>
          <p class="recipe__step"></p>
        </div>
      </div>
    `;

    this.#wrapper.innerHTML = card;

    const valueText = {
      '.recipe__name': this.recipe.name, 
      '.recipe__time span': this.recipe.time, 
      '.recipe__step': this.recipe.description
    };

    for(const [selector, value] of Object.entries(valueText)) {
      this.#setTextElement(selector, value);
    }

    // this.#setTextElement('.recipe__name', this.recipe.name);
    // this.#setTextElement('.recipe__time span', this.recipe.time);
    // this.#setTextElement('.recipe__step', this.recipe.description);
    this.#renderIngredientsList();

    return this.#wrapper;
  }
}

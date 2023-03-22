/**
 * Class representing a recipe.
 */
export class Recipe {
  /**
   * create a new instance of the Recipe class
   * @param {Object} data - the recipe data
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.ingredients = this.#getIngredientsArray(data);
    this.quantity = this.#getQuantityArray(data);
    this.time = data.time;
    this.description = data.description;
    this.appliance = [data.appliance];
    this.ustensils = data.ustensils;
    this.img = '/assets/images/recipes/recipe-illustration.svg';
  }

  /**
   * extracts the quantity and unity in recipe data
   * @param {Object} data the recipe data
   * @returns {string[]} array with all quantity with their respective units
   */
  #getQuantityArray (data) {
    return data.ingredients.map((element) => {
      // if quantity is not indicate we just add an empty string
      if(!element.quantity) {
        return '';
      }
      const quantity = element.quantity.toString();
      return quantity + (element.unit ? ` ${element.unit}` : '');
    });
  }

  /**
   * extracts the ingredient data from our data object
   * @param {Object} data the recipe data
   * @returns {string[]} array of all ingredients
   * @private
   */
  #getIngredientsArray (data) {
    return data.ingredients.map((element) => element.ingredient);
  }
}

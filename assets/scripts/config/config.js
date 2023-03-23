const config = {
  SELECTORS: {
    // recipe
    containerListRecipe: '.recipe-list',
    recipe: '.recipe',
    recipeNotHidden: '.recipe:not(.recipe--hidden)',
    inputSearchRecipes: '#search-recipe',
    ingredientsList: '.recipe__ingredients-list',
    recipeIngredientName: '.recipe__ingredient-name',
    // Select tag
    dropdownItem: '.dropdown__item',
    tagList: '.tag-list',
    tagListItem: '.tag-list__item',
    filterTagContainer: '.filter-tag'
  },
  CLASS: {
    dropdownHiddenItem: 'dropdown__item--hidden',
    itemHidden: 'item--hidden',
    hiddenRecipe: 'recipe--hidden',
    recipeIngredientItem: 'recipe__ingredient-item'
  },
  CONSTANTS: {
    urlData: './assets/data/recipes.json'
  }
};

export default config;
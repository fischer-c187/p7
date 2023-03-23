/**
 * Class representing a generic API.
 */
export class Api {
  /**
   * Create an API instance.
   * @param {string} url - The base URL of the API.
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * Fetch JSON data from the API.
   * @returns {Promise<any>} A promise resolving to the fetched JSON data.
   * @throws {Error} If the request fails or the JSON response is empty.
   */
  async getJsonData() {
    const response = await fetch(this.url);

    if (!response.ok) {
      throw new Error(`Error in request: ${response.status} with ${this.url}`);
    }

    const responseJson = await response.json();
    if(!responseJson.length) {
      throw new Error('Error in Json: array is empty');
    }

    return responseJson;
  }
}

/**
 * Class representing a Recipe API, extending the generic API class.
 */
export class RecipeApi extends Api {
  /**
   * Create a Recipe API instance.
   * @param {string} url - The base URL of the Recipe API.
   */
  constructor(url) {
    super(url);
  }
  
  /**
   * Fetch an array of all recipes from the API.
   * @returns {Promise<Recipe[]>} A promise resolving to an array of Recipe objects.
   */
  async getAllRecipeArray () {
    return this.getJsonData();
  }
}

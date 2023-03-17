export class Api {
  constructor(url) {
    this.url = url;
  }

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

export class RecipeApi extends Api {
  constructor(url) {
    super(url);
  }

  async getAllRecipeArray () {
    return this.getJsonData();
  }

  
}

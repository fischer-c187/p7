import config from '../config/config.js';

/**
 * Debounce function to delay the execution of a function.
 *
 * @param {Function} func - The function to execute.
 * @param {number} wait - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
function debounce(func, wait) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply();
    }, wait);
  };
}

/**
 * RecipeObserver class for observing changes in the recipe list and notifying subscribers.
 */
export class RecipeObserver {
  #observers;

  /**
   * Constructor for RecipeObserver.
   */
  constructor(){
    this.#observers = [];
    this.#init();
  }

  /**
   * Initialize the RecipeObserver by setting up the MutationObserver and starting the observation.
   */
  #init () {
    const recipeList = document.querySelector(config.SELECTORS.containerListRecipe); 
    const observer = new MutationObserver(this.#classChanging);

    const observerConfig = { attributes: true, subtree: true, attributeFilter: ['class'], attributeOldValue: true };
    observer.observe(recipeList, observerConfig);
    
  }

  /**
   * Handles class changes on the recipe list.
   *
   * @param {Array} mutations - An array of MutationRecord objects.
   */
  #classChanging = (mutations) => {
    const debouncedFire = debounce(() => this.fire(), 200);

    mutations.forEach((mutation) => {
      if (this.#shouldFire(mutation)) {
        debouncedFire();
      }
    });
  };

  /**
   * Determines if the observer should fire based on the mutation.
   *
   * @param {MutationRecord} mutation - The mutation record object.
   * @returns {boolean} - True if the observer should fire, false otherwise.
   */
  #shouldFire(mutation) {
    const hidden = mutation.target.classList.contains(config.CLASS.hiddenRecipe);
    const oldValue = mutation.oldValue.indexOf(config.CLASS.hiddenRecipe) === -1;

    return (hidden && oldValue) || (!hidden && !oldValue);
  }

  /**
   * Subscribe an object to the observer.
   *
   * @param {Object} sub - The object to subscribe.
   */
  subscribe(sub) {
    this.#observers.push(sub);
  }

  /**
   * Unsubscribe an object from the observer.
   *
   * @param {Object} sub - The object to unsubscribe.
   */
  unsubscribe(sub) {
    this.#observers = this.#observers.filter(obs => obs !== sub);
  }

  /**
   * Notify all subscribers of changes in the recipe list.
   */
  fire() {
    this.#observers.forEach(subscriber => {
      subscriber.updateListItem();
    });
  }
}
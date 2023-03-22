function debounce(func, wait) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply();
    }, wait);
  };
}

export class RecipeObserver {
  #observers;
  constructor(){
    this.#observers = [];
  }

  init () {
    const recipeList = document.querySelector('.recipe-list'); 
    const observer = new MutationObserver(this.#classChanging);

    const config = { attributes: true, subtree: true, attributeFilter: ['class'], attributeOldValue: true };
    observer.observe(recipeList, config);
    
  }
 
  #classChanging = (mutations) => {
    const debouncedFire = debounce(() => this.fire(), 200);

    mutations.forEach((mutation) => {
      if (this.#shouldFire(mutation)) {
        debouncedFire();
      }
    });
  };

  #shouldFire(mutation) {
    const hidden = mutation.target.classList.contains('recipe--hidden');
    const oldValue = mutation.oldValue.indexOf('recipe--hidden') === -1;

    return (hidden && oldValue) || (!hidden && !oldValue);
  }

  subscribe(sub) {
    this.#observers.push(sub);
  }

  unsubscribe(sub) {
    this.#observers = this.#observers.filter(obs => obs !== sub);
  }

  fire() {
    this.#observers.forEach(subscriber => {
      subscriber.updateListItem();
    });
  }
}
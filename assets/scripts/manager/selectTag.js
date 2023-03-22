/**
 * @class SelectTag
 * A class to manage and manipulate tags for filtering recipes.
 */
export class SelectTag {
  #datamanager;
  #type;
  #dropdown;
  #itemList;
  #tagList;

  /**
   * @constructor
   * @param {string} type - The category of tag
   * @param {Object} datamanager - The data manager instance to manage the recipe data.
   */
  constructor(type, datamanager) {
    this.#datamanager = datamanager;
    this.#type = type;
    this.#dropdown = document.querySelector(`#dropdown-${this.#type}`);
    this.#itemList = [];
    this.#tagList = this.#newElement('ul', ['tag-list', `${this.#type}-tag`], {'data-type': this.#type});

    document.querySelector('.filter-tag').append(this.#tagList);
  }

  /**
   * @private
   * Create and append a tag element to the tag list.
   * @param {Event} event
   */
  #createTag (event) {
    const tag = this.#createTagElement(event.target.innerText);

    this.#tagList.append(tag); 
  }

  /**
   * @private
   * Check if a tag with the given value already exists in the tag list.
   * @param {string} value - The value to check for in the tag list.
   * @returns {boolean} - Returns true if the tag exists, false otherwise.
   */
  #tagExist (value) {
    const listItem = document.querySelectorAll(`.${this.#type}-tag li`);
    
    if (!listItem.length) {
      return false;
    }

    return Array.from(listItem).some(element => element.innerText === value);
  }

  /**
   * @private
   * Create and set the item elements for the dropdown list.
   */
  #setItem () {
    this.#datamanager[this.#type].forEach(item => {
      const itemList = this.#createItem(item);
      this.#dropdown.append(itemList);
      this.#itemList.push(itemList);
    });
  }

  /**
   * @private
   * Handle click events on the dropdown list items.
   */
  #handleClickItem () {
    this.#dropdown.addEventListener('click', event => {
      const target = event.target.closest('.dropdown__item');

      if(!target) {
        return;
      }

      if(!this.#tagExist(target.innerText)){
        // sort recipe with tag
        this.#datamanager.filterByTag(this.#type, target.innerText);
        this.#createTag(event);
      }
      
    });
  }

  /**
   * @private
   * Handle input events on the search field to filter dropdown list items.
   */
  #handleInputSearch () {
    document
      .querySelector(`#input-${this.#type}`)
      .addEventListener('input', (event) => {
        this.#itemList.forEach(element => {
          const textItem = element.innerText.toLowerCase();
          const textInput = event.target.value.toLowerCase();

          element.classList.toggle('item--hidden', !textItem.includes(textInput));
        });
      });
  }

  /**
   * @private
   * Create a dropdown list item element.
   * @param {String} item - The item string.
   * @returns {HTMLElement} - The created item element.
   */
  #createItem (item) {
    const itemElement = this.#newElement('li', ['dropdown__item']);
    itemElement.innerText = item;

    return itemElement;
  }

  /**
   * @private
   * Handle click events on the tag list to remove tags.
   */
  #handleTagListClick() {
    this.#tagList.addEventListener('click', (event) => {
      const target = event.target.closest('.tag-list__item');

      if (!target) {
        return;
      }
  
      target.remove();
      this.#datamanager.filterAllTag();
    });
  }

  /**
   * @private
   * Create a tag element with the given value.
   * @param {string} value - The value for the new tag.
   * @returns {HTMLElement} - The created tag element.
   */
  #createTagElement (value) {
    const tag = this.#newElement('li', ['tag-list__item', `tag-list__item--${this.#type}`]);
    tag.innerHTML = '<i class="tag-list__icon fa-regular fa-circle-xmark"></i>';
    const valueElement = document.createTextNode(value);

    tag.prepend(valueElement);

    return tag;
  }

  /**
   * @private
   * Create a new HTML element with the given tag, classes, and attributes.
   * @param {string} balise - The tag name for the new element.
   * @param {Array<string>} [classArray=[]] - An array of classes to add to the new element.
   * @param {Object} [attributes={}] - An object containing attribute key-value pairs to set on the new element.
   * @returns {HTMLElement} - The created HTML element.
   */
  #newElement (balise, classArray=[],attributes={}){
    const element = document.createElement(balise);
    element.classList.add(...classArray);
    Object.keys(attributes).forEach(att => {
      element.setAttribute(att, attributes[att]);
    });

    return element;
  }

  /**
   * @method updateListItem
   * Update the visibility of the dropdown list items based on the filtered data.
   * this method is called by our observer when our recipe list changes
   */
  updateListItem () {
    const items = this.#datamanager[this.#type];
    this.#itemList
      .forEach(element => {
        element.classList.toggle('dropdown__item--hidden', !items.has(element.innerText));
      });
  }

  /**
  * Initialize the SelectTag instance by setting up event listeners and populating the dropdown list.
  */
  init () {
    this.#setItem();
    this.#handleInputSearch();
    this.#handleTagListClick();
    this.#handleClickItem();
  }
}
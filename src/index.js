/**
 * Events dict
 */
const eventsBinder = {
  /**
   * Binds focus event to `target`
   * Each time the search input get focused, the form
   * element will receive a class named 'open'
   *
   * @param {HTMLElement} target - search input element to be binded
   */
  bindSearchInputFocusEvent: (target, form) => {
    target.addEventListener('focus', () => {
      if (form.className.match('open')) {
        return;
      }
      form.className += ' in';
      setTimeout(() => {
        form.className += ' open';
        form.className = form.className.replace('in', '');
      }, 1300);
    });
  },

  /**
   * Binds click event to `target`
   * Each time form is clicked, it replaces the 'open'
   * class with the 'close' class. After `1300` milliseconds,
   * this class is removed as well
   *
   * @param {HTMLElement} target - element to be binded
   */
  bindMagnifierClickEvent: (target, form, searchInput) => {
    target.addEventListener('click', (e) => {
      e.preventDefault();
      if (!form.className.match('open')) {
        return;
      }
      searchInput.value = '';
      form.className += ' close';
      form.className = form.className.replace('open', '');
      setTimeout(() => {
        form.className = form.className.replace('close', '');
      }, 1300);
    });
  },

  /**
   * Binds submit event to target
   * On submit, it will redirect the user to the
   * endpoint with the query param
   *
   * @param {HTMLElement} target - element to be binded
   */
  bindFormSubmitEvent: (target, searchInput) => {
    target.addEventListener('submit', (e) => {
      const inputValue = (searchInput.value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const endpoint = `search?q=${inputValue}`;
      location.href = endpoint;
      e.preventDefault();
      target.className += ' explode';
      setTimeout(() => {
        searchInput.value = '';
        target.className = target.className.replace('explode', '');
      }, 3000);
    });
  }
}

/**
 * Events bind caller
 */
function bindEventsOnPage () {
  const searchInput = document.querySelector('input');
  const form = document.querySelector('form');
  const magnifier = document.querySelector('.after');

  eventsBinder.bindSearchInputFocusEvent(searchInput, form);
  eventsBinder.bindMagnifierClickEvent(magnifier, form, searchInput);
  eventsBinder.bindFormSubmitEvent(form, searchInput);
}

/**
 * After 1 sec it hides loading element from page and shows
 * the weather date
 */
function pageLoadingHandler () {
  setTimeout(() => {
    const loadingDiv = document.querySelector('.loading');
    const homeDiv = document.querySelector('.home__section-slider');
    if (loadingDiv) {
      loadingDiv.className = loadingDiv.className.replace(' active', '');
      setTimeout(() => {
        loadingDiv.style.display = 'none';
      }, 100);
    }
    if (homeDiv) {
      setTimeout(() => {
        homeDiv.className = homeDiv.className.replace('hidden', '')
      }, 300);
    }
  }, 1000);
}

/**
 * On first initialization of the application
 */
function initialize () {
  pageLoadingHandler();
  bindEventsOnPage();
}

window.onload = initialize
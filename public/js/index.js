"use strict";

/**
 * Events dict
 */
var eventsBinder = {
  /**
   * Binds focus event to `target`
   * Each time the search input get focused, the form
   * element will receive a class named 'open'
   *
   * @param {HTMLElement} target - search input element to be binded
   */
  bindSearchInputFocusEvent: function bindSearchInputFocusEvent(target, form) {
    target.addEventListener('focus', function () {
      if (form.className.match('open')) {
        return;
      }

      form.className += ' in';
      setTimeout(function () {
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
  bindMagnifierClickEvent: function bindMagnifierClickEvent(target, form, searchInput) {
    target.addEventListener('click', function (e) {
      e.preventDefault();

      if (!form.className.match('open')) {
        return;
      }

      searchInput.value = '';
      form.className += ' close';
      form.className = form.className.replace('open', '');
      setTimeout(function () {
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
  bindFormSubmitEvent: function bindFormSubmitEvent(target, searchInput) {
    target.addEventListener('submit', function (e) {
      var inputValue = (searchInput.value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      var endpoint = "search?q=".concat(inputValue);
      location.href = endpoint;
      e.preventDefault();
      target.className += ' explode';
      setTimeout(function () {
        searchInput.value = '';
        target.className = target.className.replace('explode', '');
      }, 3000);
    });
  }
};
/**
 * Events bind caller
 */

function bindEventsOnPage() {
  var searchInput = document.querySelector('input');
  var form = document.querySelector('form');
  var magnifier = document.querySelector('.after');
  eventsBinder.bindSearchInputFocusEvent(searchInput, form);
  eventsBinder.bindMagnifierClickEvent(magnifier, form, searchInput);
  eventsBinder.bindFormSubmitEvent(form, searchInput);
}
/**
 * After 1 sec it hides loading element from page and shows
 * the weather date
 */


function pageLoadingHandler() {
  setTimeout(function () {
    var loadingDiv = document.querySelector('.loading');
    var homeDiv = document.querySelector('.home__section-slider');

    if (loadingDiv) {
      loadingDiv.className = loadingDiv.className.replace(' active', '');
      setTimeout(function () {
        loadingDiv.style.display = 'none';
      }, 100);
    }

    if (homeDiv) {
      setTimeout(function () {
        homeDiv.className = homeDiv.className.replace('hidden', '');
      }, 300);
    }
  }, 1000);
}
/**
 * On first initialization of the application
 */


function initialize() {
  pageLoadingHandler();
  bindEventsOnPage();
}

window.onload = initialize;
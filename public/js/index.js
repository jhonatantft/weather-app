"use strict";

var init = function init() {
  setTimeout(function () {
    var loadingDiv = document.querySelector('.loading');
    loadingDiv.className = loadingDiv.className.replace(' active', '');
    setTimeout(function () {
      loadingDiv.style.display = 'none';
    }, 100);
  }, 2000);
};

var searchInput = document.querySelector('input');
var form = document.querySelector('form');
var after = document.querySelector('.after');
searchInput.addEventListener('focus', function () {
  if (form.className.match('open')) {
    return;
  }

  form.className += ' in';
  setTimeout(function () {
    form.className += ' open';
    form.className = form.className.replace('in', '');
  }, 1300);
});
after.addEventListener('click', function (e) {
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
form.addEventListener('submit', function (e) {
  var inputValue = searchInput.value;
  var endpoint = "search?q=".concat(inputValue);
  location.href = endpoint;
  e.preventDefault();
  console.log('Thanks, high five!');
  form.className += ' explode';
  setTimeout(function () {
    searchInput.value = '';
    form.className = form.className.replace('explode', '');
  }, 3000);
});
window.onload = init;
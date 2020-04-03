"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Http request class
 * 
 * @constructor
 */
var HttpClient = /*#__PURE__*/function () {
  function HttpClient() {
    _classCallCheck(this, HttpClient);
  }

  _createClass(HttpClient, [{
    key: "get",
    value: function get(url, successCallback, errorCallback) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          successCallback(xhr.responseText);
        } else if (xhr.status === 404) {
          errorCallback(xhr);
        }
      };

      xhr.open('GET', url, true);
      xhr.send(null);
    }
  }]);

  return HttpClient;
}();

var init = function init() {
  // document.querySelector('body').innerHTML = '<img src="../assets/weather-icons/50n.svg" alt="Kiwi standing on oval">'; 
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
  var request = new HttpClient();
  var endpoint = "search?q=".concat(inputValue);
  request.get(endpoint, function onSuccess(response) {
    try {
      var data = JSON.parse(response); // something(data);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, function onError(response) {// anotherThing(response);
  });
  e.preventDefault();
  console.log('Thanks, high five!');
  form.className += ' explode';
  setTimeout(function () {
    searchInput.value = '';
    form.className = form.className.replace('explode', '');
  }, 3000);
});
window.onload = init;
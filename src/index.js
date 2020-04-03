/**
 * Http request class
 * 
 * @constructor
 */
class HttpClient {
  get (url, successCallback, errorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        successCallback(xhr.responseText);
      } else if (xhr.status === 404) {
        errorCallback(xhr);
      }
    }
    xhr.open('GET', url, true);            
    xhr.send(null);
  }
}

const init = () => {
  // document.querySelector('body').innerHTML = '<img src="../assets/weather-icons/50n.svg" alt="Kiwi standing on oval">'; 
  setTimeout(() => {
    const loadingDiv = document.querySelector('.loading');
    loadingDiv.className = loadingDiv.className.replace(' active', '');
    setTimeout(() => {
      loadingDiv.style.display = 'none';
    }, 100);
  }, 2000);
}

const searchInput = document.querySelector('input');
const form = document.querySelector('form');
const after = document.querySelector('.after');

searchInput.addEventListener('focus', () => {
  if (form.className.match('open')) {
    return;
  }
  form.className += ' in'
  setTimeout(() => {
    form.className += ' open'
    form.className = form.className.replace('in', '')
  }, 1300);
})

after.addEventListener('click', (e) => {
  e.preventDefault();
  if (!form.className.match('open')) {
    return;
  }
  searchInput.value = '';
  form.className += ' close';
  form.className = form.className.replace('open', '')
  setTimeout(() => {
    form.className = form.className.replace('close', '')
  }, 1300);
})

form.addEventListener('submit', (e) => {
  const inputValue = searchInput.value;
  const request = new HttpClient();
  const endpoint = `search?q=${inputValue}`
  request.get(endpoint,
    function onSuccess (response) {
      try {
        var data = JSON.parse(response);
        // something(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }, function onError (response) {
      // anotherThing(response);
  });

  e.preventDefault();
  console.log('Thanks, high five!');
  form.className += ' explode'
  setTimeout(() => {
    searchInput.value = '';
    form.className = form.className.replace('explode', '');
  }, 3000);
})

window.onload = init
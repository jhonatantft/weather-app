# Weather app
This is a minimalist weather app

Taking into account the proposed development time (less than 48 hours), the application is simple. The best principle of software engineering used here was "simplicity", if I don’t need to use, I don’t need to implement or import unnecessary libs

### Client side
* The client side was implemented without libs or frameworks, pure javascript

### Server side
* For the server side I used Express to speed up the development of translation routes
* There is a memory cache that checks if a request has already been made in less than two hours with the same coordinate
    * If it was done in less than two hours, the system does not make the request and returns the cached response. Otherwise, a new request is made to the external APIs

## Table of contents
[Prerequisites](#prerequisites)

[Installation](#installation)

[Project structure](#project-structure)

[Technologies used](#technologies-used)

## Prerequisites
Make sure you have these requirements installed on your machine
* Node^8
* npm / yarn / docker

## Installation

### NPM
Run:
```
$ npm i // install all dependencies
$ npm start // starts your express server using process.env.PORT or 8080
$ npm start:open // starts the aplication and open the browser
$ npm run compile:sass // compile your .sass files to .css into public folder with a watcher
$ npm run transpile // transpiles src/index.js into public folder to be used on the client
$ npm run transpile:watch // watch each change on file
$ npm run build // build your application to public folder
```

### Yarn
Run:
```
$ yarn
$ yarn start
```

### Docker

```
$ docker build -t <app name>/weather-app .
$ docker run -p 8080:8080 weather-app
```

## Project structure

````
public/ ___________________________________ # Application to serve
|- assets/
|  |- weather-icons/ ______________________ # Weather icons
|- css/ ___________________________________ # Compiled css from scss
|- js/ ____________________________________ # Transpiled javascript
src/
|  |- routes/ _____________________________ # Express routes
|  |- sass/ _______________________________ # Sass files
|  |- views/ ______________________________ # Template files
|- index.jsx _______________________________ # Client application entry
````

### Technologies used

* [Babel 7](https://github.com/babel/babel) [ transforming JSX and ES6,ES7,ES8 ]
* [Express](https://expressjs.com/) [ Fast, unopinionated, minimalist web framework for Node.js
 ]
* [Mustache Express](https://www.npmjs.com/package/mustache-express)
* [Node-sass](https://github.com/sass/node-sass) [ Binding for Node.js to LibSass ]   
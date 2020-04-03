# weather-app

## Prerequisites
Make sure you have these requirements installed on your machine
* Node^8
* npm

## Installation

### NPM
Run:
```
$ npm i // will install all dependencies
$ npm start // will start your express server using process.env.PORT or 3000
$ npm run compile:sass // will compile your .sass files to .css into public folder 
```

### Yarn
Run:
```
$ yarn
$ yarn start
$ yarn compile:sass
```

### Docker

```
$ docker build -t <app name>/weather-app .
$ docker run -p 8080:8080 weather-app
```
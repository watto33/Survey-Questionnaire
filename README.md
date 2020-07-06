
# Survey Questionnaire

![N|Solid](https://codingthesmartway.com/wp-content/uploads/2018/06/mean_logo.png)

A Questionnaire application powered by MongoDB, Express, Angular, NodeJS

# Overview

This questionnaire web application allows the registered users to take up a survey and view the submitted answers. Any users who visit the web application can view all the submitted answers. If they wish to submit their response, they must authenticate first. After authenticating, the users will be able to submit their response. Each user can submit only one response. The answers are displayed in a tabular view with the name of the user, questions and their corresponding answers. Once submitted, the response cannot be modified by the user.

### Tech

The Technical stack involved in this application are
* [Angular] - Angular is an application design framework and development platform for creating efficient and sophisticated single-page apps.
* [Node.js] - evented I/O for the backend
* [Express] - Fast, unopinionated, minimalist web framework for Node.js
* [mongoDB] - The database for modern applications
* [Angular Material] - Material Design components for Angular

### Installation

This application requires [Node.js](https://nodejs.org/) and [Angular CLI]  to run.

Install the dependencies and devDependencies and start the server.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
```sh
$ cd Survey-Questionnaire
$ npm install
$ npm start
```
## Development server

Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.
## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
## Build

Run  `ng build`  to build the project. The build artifacts will be stored in the  `dist/`  directory. Use the  `--prod`  flag for a production build.
## Running unit tests

Run  `ng test`  to execute the unit tests via  [Karma](https://karma-runner.github.io/).

## [](https://github.com/watto33/Survey-Questionnaire#running-end-to-end-tests)Running end-to-end tests

Run  `ng e2e`  to execute the end-to-end tests via  [Protractor](http://www.protractortest.org/).

### Todos

 -  Redesign the data visualization to have a better user experience.
 -  Update the styling of the web page for better user experience.
 - Add advanced authentication.

[//]: ()


   [Angular]: <http://angular.io/>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [mongoDB]: <http://mongodb.com>
   [Angular Material]: <http://material.angular.io/>
   [Angular CLI]: <http://cli.angular.io/>

# Authentication challenge

## Goal

This full stack challenge invites you to create a full registration/authentication workflow.

## Functional constraints

- Registration is made using email/password
- Only one account per email is allowed
- Reboots of the server should not logout the users
- Users must be able to :
  - Register
  - Login
  - Logout
- Frontend compatibility : Internet Explorer 10+

## Technical constraints

- Do NOT use [`passport`](http://passportjs.org/) or any other authentication library
- Storage must be one of :
  - MySQL (using [`Sequelize`](http://docs.sequelizejs.com/en/v3/))
  - MongoDB (using [`Mongoose`](http://mongoosejs.com/))
- Server is built using Node.js and ES6
- Frontend is built using [`React.js`](https://facebook.github.io/react/). You can use any of the implementations that you want, however [`Redux`](http://redux.js.org/) is preferred

## Setup

- Make sure you are running node 6.2 or upper
- Run `npm install gulp-cli -g`
- Run `npm install`
- Run `npm start`
- Go to [`http://localhost:8888/health`](http://localhost:8888/health) (health check)
- Go to [`http://localhost:8888`](http://localhost:8888) (frontend)

## Unit tests

Unit tests use `mocha`/`expect` and coverage is provided using `istanbul`. Tests are managed using `gulp`. The project is tested at 100% and is expected to remain well covered when you deliver your version.

- To run the tests : `gulp test`
- To visualize the coverage : open `/coverage/lcov-report/index.html` in your favorite browser

## Project structure

For your convenience, the project presents a basic setup which includes :
- A web server
- A simple `express` application
- An `index` view, served by the web server and powered by [`express-react-views`](https://www.npmjs.com/package/express-react-views)
- A complete test runner

You are free to modify this setup or even start from scratch with your preferred starter kit, however you might appreciate not spending time on boilerplate and use this one.

- `/config` : configuration for the application (managed by [`configman`](https://www.npmjs.com/package/configman)), such as the port on which the server is running
- `/constants` : application's constants such as the current `env`
- `/middlewares` : `express` middlewares such the error handler and the 404s catcher
- `/modules` : singletons, such as the `logger`
- `/routes` : routes declaration
- `/test` : unit and integration tests
- `/views` : React views/layouts/components

## Expectations

- The UI/UX/design is left to your total freedom and will be evaluated as an important part of this challenge
- The quality of the code will be finely examined, particularly file structures, data structures, separation of concerns, standard best practices, respect of the DRY concept and overall clearness/cleanness of the code are an important part of this challenge
- Testing is expected to be part of your everyday practices and will count on your performance
 
## Questions
 
 If you have questions regarding this test, please email your contact or create a GitHub issue with details on your needs/issues. The team will do its best to provide you with an answer quickly.
 
## Estimated time to completion
 
 The expected time to completion for this exercise is sized to 5 hours. However, and if you find yourself spending a lot more time than expected, we do not require you to fulfill the full exercise in order to submit it. Feel free to send us whatever you have been able to complete along with how much time you've spent on it and we will try to get the best out of what you did. 




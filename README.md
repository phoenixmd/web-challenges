# Worker challenge

## Goal

This challenge invites to create a worker which manages asynchronous tasks.

## Functional constraints

- A worker can only execute a defined amount of tasks per iteration (defined by `macConcurrency`)
- We must be able to deploy multiple instances of the project in order to increase the the global amount of tasks performed simultaneously (this can be simulated by running `node index.js` in multiple tabs)
- Each task can only be performed once
- If a task fails, it must be retried automatically
- It a task fails 3 times, it should not be retried anymore (defined by `maxRetries`)
- If a worker crashes, it should automatically recover

## Technical constraints

- Do NOT use any task management library
- Storage must be one of :
  - MySQL (using [`Sequelize`](http://docs.sequelizejs.com/en/v3/))
  - MongoDB (using [`Mongoose`](http://mongoosejs.com/))
- Usage of ES6 new features such as classes is encouraged


## Setup

- Make sure you are running node 6.2 or upper
- Run `npm install gulp-cli -g`
- Run `npm install`
- Run `npm start`
- You should see something like 

```
2016-09-18T21:23:58.982Z - info: [index] Iteration took 0.001 seconds
```

## Unit tests

Unit tests use `mocha`/`expect` and coverage is provided using `istanbul`. Tests are managed using `gulp`.

- To run the tests : `gulp test`
- To visualize the coverage : open `/coverage/lcov-report/index.html` in your favorite browser

## Project structure

For your convenience, the project presents a basic setup which includes :
- A basic runner in `index.js`
- A starting point for the implementation in `classes/worker.js`
- Some utilities like a logger
- A complete test runner

You are free to modify this setup or even start from scratch with your preferred starter kit, however you might appreciate not spending time on boilerplate and use this one.

- `/classes` : generic components to be consumed by the worker, such as `worker.js`
- `/config` : configuration for the application (managed by [`configman`](https://www.npmjs.com/package/configman)), such as the logging level per env
- `/constants` : application's constants such as the current `env`
- `/modules` : singletons, such as the `logger`
- `/test` : unit and integration tests

## Expectations

- The quality of the code will be finely examined, particularly file structures, data structures, separation of concerns, standard best practices, respect of the DRY concept and overall clearness/cleanness of the code are an important part of this challenge
- Testing is expected to be part of your everyday practices and will count on your performance

## Questions
 
 If you have questions regarding this test, please email your contact or create a GitHub issue with details on your needs/issues. The team will do its best to provide you with an answer quickly.
 
## Estimated time to completion
 
 The expected time to completion for this exercise is sized to 6 hours. However, and if you find yourself spending a lot more time than expected, we do not require you to fulfill the full exercise in order to submit it. Feel free to send us whatever you have been able to complete along with how much time you've spent on it and we will try to get the best out of what you did. 
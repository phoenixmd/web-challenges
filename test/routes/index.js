'use strict';

const supertest = require('supertest-as-promised');
const HTTPStatus = require('http-status');

const app = require('../../app');
app.init()
    .then(()=> {
        describe('/', function () {

            it('should serve the web app', function () {
                this.timeout(3000);
                return supertest(app)
                    .get('/')
                    .expect(HTTPStatus.OK)
                    .expect('Content-Type', 'text/html; charset=utf-8');
            });

        });
    });
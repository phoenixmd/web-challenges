'use strict';

const supertest = require('supertest-as-promised');
const HTTPStatus = require('http-status');

const app = require('../../app');

describe('/register', function () {

    it('should display the register form', function () {
        return supertest(app)
            .get('/register')
            .expect(HTTPStatus.OK)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    it('should create new user', function () {
        return supertest(app)
            .post('/register')
            .expect(HTTPStatus.OK)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });
});
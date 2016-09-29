'use strict';

const supertest = require('supertest-as-promised');
const HTTPStatus = require('http-status');

const app = require('../../app');
app.init()
    .then(()=>{
        describe('/health', function () {

            it('should respond with current time', function () {
                return supertest(app)
                    .get('/health')
                    .expect(HTTPStatus.OK)
                    .then(res => {
                        expect(res.body).to.have.keys(['now']);
                    });
            });

        });
    });

'use strict';

const supertest = require('supertest-as-promised');
const HTTPStatus = require('http-status');

const app = require('../../app');
const email = 'tango_test' + new Date().getTime() + '@test.com';
const password = '12345';

const testLogin = function () {
    describe('/logout', function () {
        it('should logout  user', function () {
            return supertest(app)
                .get('/logout')
                .expect(HTTPStatus.OK)
                .then(res => {
                    expect(res.body).to.eql({
                        "mesage": "successfully logged out"
                    })
                });
        });
    })

    return describe('/authenticate', function () {
        it('should authenticate  user', function () {
            return supertest(app)
                .post('/authenticate')
                .send({email: email, password: password})
                .expect(HTTPStatus.OK)
                .then(res => {
                    expect(res.body).to.eql({email: email})
                });
        });
        it('should fail authentication', function () {
            return supertest(app)
                .post('/authenticate')
                .send({email: email, password: password + '123'})
                .expect(HTTPStatus.UNAUTHORIZED)
                .then(res => {
                    expect(res.body).to.eql({
                        "error": true,
                        "message": "Authentication Failed",
                        "code": "AUTHENTICATION_ERROR"
                    })
                });
        });
        it('should fail authentication', function () {
            return supertest(app)
                .post('/authenticate')
                .send({email: 'a' + email, password: password + '123'})
                .expect(HTTPStatus.UNAUTHORIZED)
                .then(res => {
                    expect(res.body).to.eql({
                        "error": true,
                        "message": "Authentication Failed",
                        "code": "AUTHENTICATION_ERROR"
                    })
                });
        });
    });
};
app.init()
    .then(()=> {

        describe('/users', function () {
            it('should result invalid password', function () {
                return supertest(app)
                    .post('/users')
                    .send({email: 'test@test.com', password: '12'})
                    .expect(HTTPStatus.BAD_REQUEST)
                    .then(res => {
                        expect(res.body).to.eql({
                            "error": true,
                            "message": "Invalid password. Password should have characters 4 chars and max 12 characters",
                            "code": "VALIDATION_ERROR"
                        });
                    });
            });
            it('should result invalid password', function () {
                return supertest(app)
                    .post('/users')
                    .send({email: 'test@test.com', password: '13dasdafafafdafadadasdada4'})
                    .expect(HTTPStatus.BAD_REQUEST)
                    .then(res => {
                        expect(res.body).to.eql({
                            "error": true,
                            "message": "Invalid password. Password should have characters 4 chars and max 12 characters",
                            "code": "VALIDATION_ERROR"
                        });
                    });
            });
            it('should result invalid email', function () {
                return supertest(app)
                    .post('/users')
                    .send({email: 'test', password: password})
                    .expect(HTTPStatus.BAD_REQUEST)
                    .then(res => {
                        expect(res.body).to.eql({
                            "error": true,
                            "message": "Invalid email",
                            "code": "VALIDATION_ERROR"
                        });
                    });
            });
            it('should register  user', function () {
                return supertest(app)
                    .post('/users')
                    .send({email: email, password: password})
                    .expect(HTTPStatus.OK)
                    .then(res => {
                        expect(res.body).to.have.keys(['email']);
                    })

                    .then(()=> {
                        describe('/users', function () {
                            it('should result Email already exists', function () {
                                return supertest(app)
                                    .post('/users')
                                    .send({email: email, password: password})
                                    .expect(HTTPStatus.BAD_REQUEST)
                                    .then(res => {
                                        expect(res.body).to.eql({
                                            "error": true,
                                            "message": "Email already exists ",
                                            "code": "VALIDATION_ERROR"
                                        });
                                    });
                            });
                        });
                        return testLogin()
                    });

            });
        });


    });

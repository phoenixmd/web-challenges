'use strict';

const React = require('react');

const DefaultLayout = require('./layouts/default');

class Register extends React.Component {
    render() {
        return <DefaultLayout title={this.props.title}>
            <h1>Register New User!</h1>
    {this.props.error}
    { React.createElement('form', {method: 'post', action: '/register'},
        <label>Email: </label>,
        React.createElement('input', {
            type: 'text',
            name: 'email',
            value: this.props.params && this.props.params.email || ''
        }),
        <br/>,
        <label>Password: </label>,
        React.createElement('input', {
            type: 'password',
            name: 'password'
        }),
        <br/>,
        <label>Re-Type Password: </label>,
        React.createElement('input', {
            type: 'password',
            name: 'repeatpass'
        }),
        <br/>,
        React.createElement('button', {type: 'submit'}, "Register")
    )}
        </DefaultLayout>;


    }
}

module.exports = Register;
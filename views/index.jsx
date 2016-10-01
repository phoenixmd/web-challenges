'use strict';

const React = require('react');

const DefaultLayout = require('./layouts/default');


class Home extends React.Component {
  render() {
    return <DefaultLayout title={this.props.title}>
      <h1>Welcome to Tango's authentication challenge !</h1>
    {this.props.error}
    { React.createElement('form', {method: 'post', action: '/login'},
        <label>Email: </label>,
        React.createElement('input', {
          type: 'text',
          placeholder: 'Email',
          name: 'email',
          value: this.props.params && this.props.params.email || ''
        }),
        <label>Password: </label>,
        React.createElement('input', {
          type: 'password',
          name: 'password'
        }),
        React.createElement('button', {type: 'submit'}, "Login")
    )}
    {React.createElement('div', {}, React.createElement('a', {href: '/register'}, 'Click Here to Register'))}
    </DefaultLayout>;
  }
}

module.exports = Home;
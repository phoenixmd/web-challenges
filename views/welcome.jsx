'use strict';

const React = require('react');

const DefaultLayout = require('./layouts/default');


class Welcome extends React.Component {
    render() {
        return <DefaultLayout title={this.props.title}>
            You are logged in with email {this.props.user.email}
            {React.createElement('div', {}, React.createElement('a', {href: '/logout'}, 'logout'))}
        </DefaultLayout>;
    }
}

module.exports = Welcome;
'use strict';

const React = require('react');

const DefaultLayout = require('./layouts/default');

class Home extends React.Component {
  render() {
    return <DefaultLayout title={this.props.title}>
      <h1>Welcome to Tango's authentication challenge !</h1>
    </DefaultLayout>;
  }
}

module.exports = Home;
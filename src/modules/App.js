require('normalize.css/normalize.css');
require('styles/Bootstrap.less');
require('styles/FontAwesome.less');
require('styles/App.css');

import React from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import Nav from '../components/Nav';
import { getBills } from '../actions/bills';
import { userTotal } from '../actions/user';

class AppModule extends React.Component {
  render() {
    return (
      <div>
        <Nav/>
        <Grid>{this.props.children}</Grid>
      </div>
    );
  }
}

export default connect()(AppModule);

require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { getBills } from '../actions/bills';
import { userTotal } from '../actions/user';

class AppModule extends React.Component {
  componentWillMount() {
    this.props.dispatch(getBills());
    this.props.dispatch(userTotal());
  }
  render() {
    return (
      <div>
        <Navbar/>
        <Grid>{this.props.children}</Grid>
      </div>
    );
  }
}

export default connect()(AppModule);

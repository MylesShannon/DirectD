require('styles/Nav.css');

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { LinkContainer} from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { googleLogin, logout } from '../actions/oauth';

class NavComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleGoogleLogin() {
    this.props.dispatch(googleLogin());
  }
  handleLogout() {
    this.props.dispatch(logout());
  }
  render() {
    const showLoginLogout = this.props.token ? (
        <NavItem onClick={ this.handleLogout }>Logout</NavItem>
      ) : (
        <NavItem onClick={ this.handleGoogleLogin } id="signin-button"><img src="../images/signin_button.png" /></NavItem>
      )

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">DirectD</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {showLoginLogout}
            <LinkContainer to="/about" >
              <NavItem>About</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(NavComponent);

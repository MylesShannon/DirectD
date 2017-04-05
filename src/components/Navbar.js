require('styles/Navbar.css');

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { LinkContainer} from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
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
        <Nav pullRight>
          <NavDropdown title={ <img src={ this.props.user.profile_picture } /> } id="navbar-profile">
            <LinkContainer to="/account"><MenuItem>Account</MenuItem></LinkContainer>
            <MenuItem divider />
            <MenuItem onClick={ this.handleLogout }>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      ) : (
        <Navbar.Link pullRight>
          <img id="signin-button" onClick={ this.handleGoogleLogin } src="../signin_button.png" />
        </Navbar.Link>
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
          <Nav pullLeft>
            <LinkContainer to="/about"><NavItem>About</NavItem></LinkContainer>
          </Nav>
          {showLoginLogout}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    router: state.routing,
    token: state.auth.token,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(NavComponent);

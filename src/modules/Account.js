import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { deleteAccount } from 'actions/oauth';

class AccountModule extends React.Component {
  constructor(props) {
    super(props);
    this.handleAccountDelete = this.handleAccountDelete.bind(this);
  }

  handleAccountDelete() {
    this.props.dispatch(deleteAccount(this.props));
  }
  render() {
    return (
      <Row>
        <Col md={12}>
          <h2>Account</h2>
          <hr />
          <h3>Remove account & data?</h3>
          <Button onClick={ this.handleAccountDelete }>Delete</Button>
        </Col>
      </Row>
    );
  }
}

export default connect()(AccountModule);

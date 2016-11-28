import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Bill from '../components/Bill';
import BillInfo from '../components/BillInfo';
import { connect } from 'react-redux';

class BillModule extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col md={12}>
            <Bill billId={this.props.billId} />
          </Col>
        </Row>
        <BillInfo billId={this.props.billId} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    billId: ownProps.params.billId
  };
};

export default connect(mapStateToProps)(BillModule);

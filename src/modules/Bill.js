import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Bill from '../components/Bill';
import BillInfo from '../components/BillInfo';

class BillModule extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col md={12}>
            <Bill billId={this.props.params.billId} />
          </Col>
        </Row>
        <BillInfo billId={this.props.params.billId} />
      </div>
    );
  }
}

export default BillModule;

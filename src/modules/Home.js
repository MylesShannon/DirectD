import React from 'react';
import { Row, Col } from 'react-bootstrap';

import BillFeed from '../components/BillFeed';

class HomeModule extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col md={12}>
            <BillFeed />
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomeModule;

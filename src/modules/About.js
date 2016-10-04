import React from 'react';
import { Row, Col } from 'react-bootstrap';

class AboutModule extends React.Component {
  render() {
    return (
      <Row>
        <Col md={12}>
          <h2>About</h2>
          <p>This is an example of ReactJS workng with a NodeJS JSON API to bring the most recent active bills in the U.S. Congress to the power of the internet.</p>
          <p>Share your opinions and vote the way you would. Be your own Congress!</p>
          <br />
          <p>Written by <a href="https://github.com/MylesShannon">Myles Shannon</a></p>
        </Col>
      </Row>
    );
  }
}

export default AboutModule;

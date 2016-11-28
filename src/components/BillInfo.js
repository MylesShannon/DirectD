import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

class BillInfoComponent extends React.Component {
  render() {
    if(this.props.bills.fetched !== true) { return null; }
    const bill = this.props.bills.data[this.props.billId];
    return (
      <Row>
        <Col md={4}>
          <Panel header={'Info'}>
            <div><b>Status: </b>{bill.current_status_label}</div>
            <div><b>Congress: </b>{bill.congress}</div>
            <div><b>Source: </b><a href={bill.link} target="_blank">{bill.data_source_title}</a></div>
          </Panel>
        </Col>
        <Col md={4}>
          <Panel header={'Sponsor(s)'}>
            {bill.sponsor.map((data, index) => {
              return <ol key={index}>
                <li><a href={data.link} target="_blank">{data.name}</a></li>
              </ol>;
            })}
          </Panel>
        </Col>
        <Col md={4}>
          <Panel header={'Major Actions'}>
            <ol>
              {bill.major_actions.map((data, index) => {
                return <li key={index}>{data[2]}</li>;
              })}
            </ol>
          </Panel>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bills: state.bills
  };
};

export default connect(mapStateToProps)(BillInfoComponent)

import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

class BillInfoComponent extends React.Component {
  render() {
    return (
      <Row>
        <Col md={4}>
          <Panel header={'Info'}>
            <div><b>Status: </b>{this.props.bills[this.props.billId].current_status_label}</div>
            <div><b>Congress: </b>{this.props.bills[this.props.billId].congress}</div>
            <div><b>Source: </b><a href={this.props.bills[this.props.billId].link} target="_blank">{this.props.bills[this.props.billId].data_source_title}</a></div>
          </Panel>
        </Col>
        <Col md={4}>
          <Panel header={'Sponsor(s)'}>
            {this.props.bills[this.props.billId].sponsor.map((data, index) => {
              return <ol key={index}>
                <li><a href={data.link} target="_blank">{data.name}</a></li>
              </ol>;
            })}
          </Panel>
        </Col>
        <Col md={4}>
          <Panel header={'Major Actions'}>
            <ol>
              {this.props.bills[this.props.billId].major_actions.map((data, index) => {
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
    bills: state.bills.data
  };
};

export default connect(mapStateToProps)(BillInfoComponent)

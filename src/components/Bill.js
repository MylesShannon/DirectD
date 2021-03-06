import React from 'react';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Vote from './Vote';
import Summary from './Summary';

class BillComponent extends React.Component {
  render() {
    if(this.props.bills.fetched !== true) { return null; }
    const bill = this.props.bills.data[this.props.billId];
    const head = (
      <strong><Link to={'/bill/'+this.props.billId}>{bill.title}</Link></strong>
    )
    const foot = (
      <div>
        <div className="pull-left">introduced: {new Date(bill.introduced_date).toLocaleString()}</div>
        <div className="pull-right">source: <a href={bill.link} target="_blank">{bill.data_source_title}</a></div>
        <div className="clearfix"></div>
      </div>
    )

    return (
      <div>
        <Panel header={head} footer={foot}>
          <Vote billId={this.props.billId} />
          <Summary bill={bill} />
        </Panel>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bills: state.bills
  };
};

export default connect(mapStateToProps)(BillComponent);


require('styles/BillFeed.css')

import React from 'react';
import Bill from './Bill';
import { connect } from 'react-redux';
import FontA from 'react-fontawesome';

class BillFeedComponent extends React.Component {
  render() {
    if(this.props.bills.fetching === true && this.props.bills.fetched === false) {
      return <div className="bill-feed-loading"><FontA name="spinner" size="5x" pulse fixedWidth /></div>
    } else if(this.props.bills.fetching === false && this.props.bills.fetched === true) {
      if(this.props.bills.ids.length >= 1) {
        var list = [];
        this.props.bills.ids.forEach((id, index) => {
          list.push(<Bill billId={id} key={index} />);
        })
        return <div>{list}</div>;
      } else {
        return <h2><small>Sorry, no new bills right now.</small></h2>
      }
    } else if(this.props.bills.fetching === false && this.props.bills.fetched === false && this.props.bills.error) {
      return <h2><small>Sorry, there was an error retrieving the bills.</small></h2>
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    bills: state.bills
  };
};

export default connect(mapStateToProps)(BillFeedComponent);

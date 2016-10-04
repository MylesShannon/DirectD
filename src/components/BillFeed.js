import React from 'react';
import Bill from './Bill';
import { connect } from 'react-redux';

class BillFeedComponent extends React.Component {
  render() {
    const showBills = () => {
      if(this.props.billIds.length >= 1) {
        var combo = [];
        this.props.billIds.forEach((id, index) => {
          combo.push(<Bill billId={id} key={index} />);
        })
        return combo;
      } else {
        return <h2><small>Sorry, no new bill right now.</small></h2>
      }
    }

    return (
      <div>
        {showBills()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    billIds: state.bills.ids
  };
};

export default connect(mapStateToProps)(BillFeedComponent);

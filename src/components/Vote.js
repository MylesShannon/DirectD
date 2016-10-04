require('styles/Vote.css');

import React from 'react';
import { Well, Button } from 'react-bootstrap';
import FontA from 'react-fontawesome';
import { connect } from 'react-redux';

import { voteUp, voteDown } from '../actions/vote';

// Need this Vote's parent Bill ID to POST/DELETE vote

class VoteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }
  handleUpVote() {
    this.props.dispatch(voteUp(this.props.billId, this.props.user.id));
  }
  handleDownVote() {
    this.props.dispatch(voteDown(this.props.billId, this.props.user.id));
  }
  render() {
    var bill = this.props.bills[this.props.billId];
    const didUserVote = () => {
      var found = false;
      if(this.props.user['_votes_by_bill']) {
        this.props.user['_votes_by_bill'].forEach((id) => {
          if(bill.id === id) {
            found = true
          }
        })
      }
      return found;
    }
    const voteButtonState = didUserVote() ? (<Button bsSize="large" bsStyle="default" onClick={this.handleDownVote}><FontA name="thumbs-o-down" /></Button>) : (<Button bsSize="large" bsStyle="primary" onClick={this.handleUpVote}><FontA name="thumbs-o-up" /></Button>);
    const showVoteButton = this.props.token ? (
        <span>{voteButtonState}</span>
      ) : (
        <span>sign in to vote</span>
      )

    return (
        <Well className="vote-box">
          <div className="vote-action">
            {showVoteButton}
          </div>
          <div className="vote-count">
            <span className="vote-total">{bill['_votes_by_user'].length || 0}</span> / <span className="user-total">{this.props.total || 0}</span>
          </div>
        </Well>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    bills: state.bills.data,
    total: state.user.total
  };
};

export default connect(mapStateToProps)(VoteComponent);

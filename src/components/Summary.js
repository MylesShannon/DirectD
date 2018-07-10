require('styles/Summary.css');

import React from 'react';
import { Well } from 'react-bootstrap';

class SummaryComponent extends React.Component {

  render() {
    const summary = () => {
      if(this.props.bill['_text'].summary) {
        return <Well>{this.props.bill['_text'].summary.text}</Well>
      } else {
        return <Well>No summary available for this bill</Well>
      }
    }

    return (
      <div className="bill-summary">
        {summary()}
      </div>
    )
  }
}

export default SummaryComponent;

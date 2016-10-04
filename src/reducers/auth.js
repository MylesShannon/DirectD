const initialState = {
  token: null,
  user: {}
};

import update from 'react/lib/update';

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'OAUTH_SUCCESS':
      return Object.assign({}, state, {
        token: action.token,
        user: action.user
      });
    case 'OAUTH_FAILURE':
      return state;
    case 'VOTE_UP_SUCCESS':
      return update(state, {
        user: {
          ['_votes_by_bill']: { $push: [action.billId] }
        }
      })
    case 'VOTE_UP_FAILURE':
      return state;
    case 'VOTE_DOWN_SUCCESS':
      var index = 0;
      state.user['_votes_by_bill'].forEach((vote, i) => {
        if(vote === action.billId) {
          index = i;
        }
      });
      return update(state, {
        user: {
          ['_votes_by_bill']: { $splice: [[index, 1]] }
        }
      });
    case 'VOTE_DOWN_FAILURE':
      return state;
    case 'LOGOUT_SUCCESS':
      return initialState;
    default:
      return state;
  }
}

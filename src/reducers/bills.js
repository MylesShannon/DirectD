const initialState = {
  data: {},
  ids : []
};

import update from 'react/lib/update';

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'GET_BILLS_SUCCESS':
      return Object.assign({}, state, {'data': action.entities, ids: action.result});
    case 'GET_BILLS_FAILURE':
      return initialState;
    case 'VOTE_UP_SUCCESS':
      return update(state, {
        data: {
          [action.billId]: {
            ['_votes_by_user']: { $push: [action.userId] }
          }
        }
      })
    case 'VOTE_UP_FAILURE':
      return state;
    case 'VOTE_DOWN_SUCCESS':
      var index = 0;
      state.data[action.billId]['_votes_by_user'].forEach((vote, i) => {
        if(vote === action.userId) {
          index = i;
        }
      });
      return update(state, {
        data: {
          [action.billId]: {
            ['_votes_by_user']: { $splice: [[index, 1]] }
          }
        }
      });
    case 'VOTE_DOWN_FAILURE':
      return state;
    default:
      return state;
  }
}

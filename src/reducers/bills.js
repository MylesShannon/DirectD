const initialState = {
  fetching: false,
  fetched: false,
  data: {},
  ids : [],
  error: false
};

import update from 'react/lib/update';

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'GET_BILLS_PENDING':
      return {...state, fetching: true}
    case 'GET_BILLS_FULFILLED':
      return {...state, fetching: false, fetched: true, 'data': action.payload.entities.bills, 'ids': action.payload.result.bills };
    case 'GET_BILLS_REJECTED':
      return {...state, fetching: false, error: true};
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

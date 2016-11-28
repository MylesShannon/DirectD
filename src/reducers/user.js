const initialState = {
  fetching: false,
  fetched: false,
  total: 0
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'USER_TOTAL_PENDING':
      return { ...state, fetching: true};
    case 'USER_TOTAL_FULFILLED':
      return { ...state, fetching: false, fetched: true, total: action.payload};
    case 'USER_TOTAL_REJECTED':
      return { ...state, fetching: false, error: action.payload};
    case 'OAUTH_SUCCESS':
      return Object.assign({}, state, { total: action.user.total });
    default:
      return state;
  }
}

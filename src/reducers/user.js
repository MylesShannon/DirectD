const initialState = {
  total: 0
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'USER_TOTAL_SUCCESS':
      return Object.assign({}, state, { total: action.total });
    case 'USER_TOTAL_FAILURE':
      return initialState;
    case 'OAUTH_SUCCESS':
      return Object.assign({}, state, { total: action.user.total });
    default:
      return state;
  }
}

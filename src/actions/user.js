export function userTotal() {
  return (dispatch) => {
    return fetch('http://localhost:8002/api/v1/users/total', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'USER_TOTAL_SUCCESS',
            total: json
          });
        });
      } else {
        dispatch({
          type: 'USER_TOTAL_FAILURE'
        });
      }
    });
  };
}

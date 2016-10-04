export function voteUp(billId, userId) {
  return (dispatch) => {
    return fetch('http://localhost:8002/api/v1/vote/'+billId, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        return response.json().then(() => {
          dispatch({
            type: 'VOTE_UP_SUCCESS',
            billId: billId,
            userId: userId
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'VOTE_UP_FAILURE',
            vote: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}

export function voteDown(billId, userId) {
  return (dispatch) => {
    return fetch('http://localhost:8002/api/v1/vote/'+billId, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        return response.json().then(() => {
          dispatch({
            type: 'VOTE_DOWN_SUCCESS',
            billId: billId,
            userId: userId
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'VOTE_DOWN_FAILURE',
            vote: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}

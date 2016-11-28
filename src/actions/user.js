export function userTotal() {
  return ({
    type: 'USER_TOTAL',
    payload: new Promise((resolve) => {
      fetch('http://localhost:8002/api/v1/users/total', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      }).then((response) => {
        resolve(response.json());
      })
    })
  })
}

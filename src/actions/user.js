var config = require('config');

export function userTotal() {
  return ({
    type: 'USER_TOTAL',
    payload: new Promise((resolve) => {
      fetch(config.api+'/api/v1/users/total', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      }).then((response) => {
        resolve(response.json());
      })
    })
  })
}

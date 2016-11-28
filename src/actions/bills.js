import { Schema, arrayOf } from 'normalizr';
var config = require('config');

export function getBills() {
  return (dispatch) => dispatch({
    type: 'GET_BILLS',
    payload: new Promise((resolve, reject) => {
      fetch(config.api+'/api/v1/bills', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        if(response.ok) {
          resolve(response.json());
        } else {
          reject(response);
        }
      })
    }),
    meta: {
      schema: {
        bills: arrayOf(new Schema('bills'))
      }
    }
  }).catch(()=>{})
}

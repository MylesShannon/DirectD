import { Schema, arrayOf } from 'normalizr';

export function getBills() {
  return (dispatch) => dispatch({
    type: 'GET_BILLS',
    payload: new Promise((resolve, reject) => {
      fetch('http://localhost:8002/api/v1/bills', {
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

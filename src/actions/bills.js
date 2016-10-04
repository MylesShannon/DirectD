import { normalize, Schema, arrayOf } from 'normalizr';

const bill = new Schema('bill');
const bills = new Schema('bills');

bills.define({
  id: bill
});

export function getBills() {
  return (dispatch) => {
    return fetch('http://localhost:8002/api/v1/bills', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          const wrappedArr = { bills: json }
          const normalized = normalize(wrappedArr, {
            bills: arrayOf(bills)
          });
          dispatch({
            type: 'GET_BILLS_SUCCESS',
            entities: normalized.entities.bills,
            result: normalized.result.bills
          });
        });
      } else {
        dispatch({
          type: 'GET_BILLS_FAILURE'
        });
      }
    });
  };
}

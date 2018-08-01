import axios from 'axios';

export const FETCH_USERS = 'fetch_users';
export const FETCH_DATA = 'fetch_data';

export function fetchUsers(page) {
  return function (dispatch) {
    const url = `https://reqres.in/api/users?page=${page}`;
    axios.get(url)
      .then((response) => {
        dispatch({
          type: FETCH_USERS,
          payload: response,
        });
        dispatch({
          type: FETCH_DATA,
          payload: response,
        });
      });
  };
}

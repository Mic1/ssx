import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function auth2Reducer(state = initialState.auth2, action) {
  switch (action.type) {
    case types.SIGNIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.SIGNIN_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        plyrId: action.plyr_id,
        plyrNm: action.plyr_nm
      };
    case types.SIGNIN_FAILURE:
      return state;

    case types.SIGNIN_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}

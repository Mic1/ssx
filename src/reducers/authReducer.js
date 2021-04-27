import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        username: action.username,
        roles: action.roles || []
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        token: ''
      };
    case types.LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case types.LOGOUT_REQUEST:
      return {
        ...state,
        token: '',
        isFetching: false
      };

    case types.SIGNIN_REQUEST:
      return {
        ...state,
        chnl2: action.info,
        isFetching: true
      };
    case types.SIGNIN_REQUEST_SUCCESS:
      return {
        ...state,
        plyrId: action.result[0].plyr_id,
        plyrNm: action.result[0].plyr_nm,
        isFetching: false
      };
    // case types.SIGNIN_SUCCESS:
    //   return {
    //     ...state,
    //     plyrId: action.plyr_id,
    //     plyrNm: action.plyr_nm
    //   };
    // case types.SIGNIN_FAILURE:
    //   return state;

    case types.SIGNIN_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false
      };

    default:
      return state;
  }
}

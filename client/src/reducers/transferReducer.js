import {
    GET_TRANSFER,
    GET_TRANSFERS,
    TRANSFER_LOADING,
    CLEAR_CURRENT_TRANSFER
  } from '../actions/types';
  
  const initialState = {
    transfer: null,
    transfers: null,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case TRANSFER_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_TRANSFER:
        return {
          ...state,
          transfer: action.payload,
          loading: false
        };
      case GET_TRANSFERS:
        return {
          ...state,
          transfers: action.payload,
          loading: false
        };
      case CLEAR_CURRENT_TRANSFER:
        return {
          ...state,
          transfer: null
        };
      default:
        return state;
    }
  }
import axios from 'axios';

import {
  GET_TRANSFER,
  GET_TRANSFERS,
  TRANSFER_LOADING,
  CLEAR_CURRENT_TRANSFER,
  GET_ERRORS,
  SET_CURRENT_USER
} from './types';

// Get current profile
export const getCurrentTransfer = () => dispatch => {
  dispatch(setTransferLoading());
  axios
    .get('/api/transfer/current')
    .then(res =>
      dispatch({
        type: GET_TRANSFER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TRANSFER,
        payload: {}
      })
    );
};

// Get profile by handle
export const getTransferByHandle = id => dispatch => {
  dispatch(setTransferLoading());
  axios
    .get(`/api/transfer/id/${id}`)
    .then(res =>
      dispatch({
        type: GET_TRANSFER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TRANSFER,
        payload: null
      })
    );
};

// Create Profile
export const createTransfer = (transferData, history) => dispatch => {
  axios
    .post(`/api/transfer/id/${transferData.user}`, transferData)
    .then(res => history.push('/transfers'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};





// Get all profiles
export const getTransfers = () => dispatch => {
  dispatch(setTransferLoading());
  axios
    .get('/api/transfer/all')
    .then(res =>
      dispatch({
        type: GET_TRANSFERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TRANSFERS,
        payload: null
      })
    );
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/transfer')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Profile loading
export const setTransferLoading = () => {
  return {
    type: TRANSFER_LOADING
  };
};

// Clear profile
export const clearCurrentTransfer = () => {
  return {
    type: CLEAR_CURRENT_TRANSFER
  };
};
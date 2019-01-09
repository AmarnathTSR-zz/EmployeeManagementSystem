import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validations/is-empty";

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        isAdmin: action.payload.role === "admin",
        user: action.payload
      };

    default:
      return state;
  }
}

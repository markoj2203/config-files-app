import { combineReducers } from "redux";

const getAuthToken = (state = "", action) => {
  switch (action.type) {
    case "GET_AUTH_TOKEN":
      return { ...state, token: action.token };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  getAuthToken,
});

export default rootReducer;

import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";

import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import appReducer from "./appReducer";
import gameReducer from "./gameReducer";

export default combineReducers({
  auth: authReducer,
  routing: routerReducer,
  app: appReducer,
  form: formReducer,
  game: gameReducer,
});

import { combineReducers } from "redux";
import user from "./user";
import application from "./application";

export default combineReducers({
  user,
  application,
});

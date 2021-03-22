import { RESET_APP, TOGGLE_DARK_MODE } from "../actions/types";

const INITIAL_STATE = { darkMode: true };

export default function rootReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode };
    case RESET_APP:
      return INITIAL_STATE;

    default:
      return state;
  }
}

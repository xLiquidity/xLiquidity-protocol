import {
  ACCOUNT_DISCONNECTED,
  PROVIDER_LOADED,
  SIGNER_LOADED,
  ACCOUNT_LOADED,
  ACCOUNT_UPDATED,
  BALANCE_LOADED,
  TOKEN_BALANCES_LOADED,
} from "../actions/types";

const INITIAL_STATE = { user: null };

export default function rootReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case PROVIDER_LOADED:
      return { ...state, provider: action.provider };
    case SIGNER_LOADED:
      return { ...state, signer: action.signer };
    case ACCOUNT_LOADED:
      return { ...state, account: action.account };
    case ACCOUNT_UPDATED:
      return { ...state, account: action.account };
    case BALANCE_LOADED:
      return { ...state, balance: action.balance };
    case TOKEN_BALANCES_LOADED:
      return { ...state, balances: action.balances };
    case ACCOUNT_DISCONNECTED:
      return { ...state, account: null };

    default:
      return state;
  }
}

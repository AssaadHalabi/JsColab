import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface UserState {
  email: string | null;
}

const initialState: UserState = {
  email: null
};

const reducer = produce((state: UserState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN_USER:
      state.email = action.payload;
      return state;
    case ActionType.LOGOUT_USER:
      state.email = null;
      return state;
    
    default:
      return state;
  }
});


export default reducer;

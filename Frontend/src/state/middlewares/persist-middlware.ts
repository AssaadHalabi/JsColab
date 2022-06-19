import { Dispatch } from "redux";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";
import { fetchNotebookFromLocalStorage } from "../../hooks/fetchNotebook";

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        const { user:{email} } = getState();
  let notebook_id = localStorage.getItem("notebook_id") || "";
  console.log(email);
  
  const isOwner =
    email === fetchNotebookFromLocalStorage(notebook_id).owner_email;
  console.log(`persistMiddleware running ${email && isOwner}`);
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          if (email && isOwner) {
            saveCells(notebook_id)(dispatch, getState);
          }
        }, 250);
      }
    };
  };
};

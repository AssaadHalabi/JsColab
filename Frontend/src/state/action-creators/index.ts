import axios from "axios";
import { Dispatch } from "redux";
import bundle from "../../bundler";
import {
  fetchNotebookFromLocalStorage
} from "../../hooks/fetchNotebook";
import { ActionType } from "../action-types";
import {
  Action, DeleteCellAction, Direction, InsertCellAfterAction, MoveCellAction, UpdateCellAction
} from "../actions";
import { Cell, CellTypes } from "../cell";
import { Notebook } from "../notebook";
import { RootState } from "../reducers";

export const updateCell = (uuid: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      uuid,
      content,
    },
  };
};

export const deleteCell = (uuid: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: uuid,
  };
};

export const moveCell = (
  uuid: string,
  direction: Direction
): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      uuid,
      direction,
    },
  };
};

export const insertCellAfter = (
  uuid: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      uuid,
      type: cellType,
    },
  };
};

export const createBundle = (cellUuid: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellUuid,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellUuid,
        bundle: result,
      },
    });
  };
};

export const fetchCells = (notebook_id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });
    console.log("fetch");

    try {
      let notebook: Notebook = fetchNotebookFromLocalStorage(notebook_id);
      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: notebook.cells,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: err.message,
      });
    }
  };
};

export const saveCells = (notebook_id: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
      user : {email}
    } = getState();

    let notebook: Notebook = fetchNotebookFromLocalStorage(notebook_id);
    const cells: Cell[] = order.map((uuid) => data[uuid]);

    notebook.cells = cells;
    // console.log(`%ccurrent: notebook_${notebook_id}`, 'background: #222; color: #bada55');
    console.log(`Before saving`);
    console.log(localStorage.getItem(`notebook_${notebook_id}`));

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/updateNotebook`,
        {notebook, user_email: email}
      );
      localStorage.setItem(`notebook_${notebook_id}`, JSON.stringify(notebook));
      localStorage.setItem("notebook_id", notebook_id);

      console.log(`%cSaved`, "background: #222; color: #bada55");
      console.log(
        JSON.parse(localStorage.getItem(`notebook_${notebook_id}`) || "")
      );
    } catch (err: any) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: err.message,
      });
    }
  };
};

export const loginUser = (email: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch({
      type: ActionType.LOGIN_USER,
      payload: email,
    });
  };
};
export const logoutUser = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch({
      type: ActionType.LOGOUT_USER,
    });
  };
};

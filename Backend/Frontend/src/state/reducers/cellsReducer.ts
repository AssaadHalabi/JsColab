import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import { v4 } from "uuid";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SAVE_CELLS_ERROR:
      state.error = action.payload;

      return state;
    case ActionType.FETCH_CELLS:
      state.loading = true;
      state.error = null;

      return state;
    case ActionType.FETCH_CELLS_COMPLETE:
      state.order = action.payload.map((cell) => cell.uuid);
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.uuid] = cell;
        return acc;
      }, {} as CellsState["data"]);

      return state;
    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;

      return state;
    case ActionType.UPDATE_CELL:
      const { uuid, content } = action.payload;

      state.data[uuid].content = content;

      return state;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((uuid) => uuid !== action.payload);

      return state;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex(
        (uuid) => uuid === action.payload.uuid
      );
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.uuid;

      return state;
    case ActionType.INSERT_CELL_AFTER:
      let notebook_id = localStorage.getItem("notebook_id") || "";
      const cell: Cell = {
        content: "",
        notebook_id: notebook_id,
        type: action.payload.type,
        uuid: randomId(),
      };

      state.data[cell.uuid] = cell;

      const foundIndex = state.order.findIndex(
        (uuid) => uuid === action.payload.uuid
      );

      if (foundIndex < 0) {
        state.order.unshift(cell.uuid);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.uuid);
      }

      return state;
    default:
      return state;
  }
});

const randomId = () => {
  return v4();
};

export default reducer;

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { persistMiddleware } from "./middlewares/persist-middlware";
import storage from "redux-persist/lib/storage";
import {persistStore, persistReducer} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const createStoreAndPersistor = () => {
  let store = createStore(
    persistedReducer,
    {},
    applyMiddleware(persistMiddleware, thunk)
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

// export const store = createStore(
//   reducers,
//   {},
//   applyMiddleware(persistMiddleware, thunk)
// );

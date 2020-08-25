import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools()
);

const storeWithDefault = initialValue => createStore(
  rootReducer,
  initialValue,
  composeWithDevTools()
);

export default store;
export { storeWithDefault };

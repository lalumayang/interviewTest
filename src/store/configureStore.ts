import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "../epic/rootEpic";
import rootReducer from "../reducers/rootReducer";

const epicMiddleware = createEpicMiddleware();

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;

import { createHashHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers/rootReducer";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "../epic/rootEpic";

declare global {
  interface Window {
    readonly __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  }
}

export const history = createHashHistory();
const epicMiddleware = createEpicMiddleware();

const logger: any = createLogger({ diff: true, collapsed: true });
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const composed =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(epicMiddleware))
    : composeEnhancers(applyMiddleware(epicMiddleware, logger));

const configureStore = () => {
  const store = createStore(rootReducer, composed);
  epicMiddleware.run(rootEpic);
  return store;
};

export default configureStore;

import { AnyAction, combineReducers } from "redux";

import report, { ReportState } from "./report";

export interface StoreState {
  report: ReportState;
}

const appReducer = combineReducers({
  report
});

export default (state: StoreState | undefined, action: AnyAction) => {
  return appReducer(state, action);
};

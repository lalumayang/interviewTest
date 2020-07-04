import { combineEpics } from "redux-observable";
import getReportEpic from "./getReport";

const reportEpics = [getReportEpic];

export default combineEpics(...reportEpics);

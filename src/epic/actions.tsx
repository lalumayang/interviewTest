import { createAction } from "./util";
import { ErrorState } from "./models";

export const [
  GET_REPORT,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAILURE
] = createAction("GET_REPORT");

export const getReport = (
  dateFrom: string,
  dateTo: string,
  battery1From: number,
  battery1To: number,
  battery2From: number,
  battery2To: number
) => {
  return {
    type: GET_REPORT,
    payload: {
      dateFrom,
      dateTo,
      battery1From,
      battery1To,
      battery2From,
      battery2To
    }
  };
};

export const getReportSuccess = (data: any) => {
  return {
    type: GET_REPORT_SUCCESS,
    payload: data
  };
};

export const getReportFailure = (data: ErrorState) => {
  return {
    type: GET_REPORT_FAILURE,
    payload: data
  };
};

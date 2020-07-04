import { AnyAction } from "redux";
import {
  GET_REPORT,
  GET_REPORT_SUCCESS,
  GET_REPORT_FAILURE,
} from "../epic/actions";

export interface Report {
  id: string;
  gps: { [key: string]: { lat: string; long: string } };
  battery: { [key: string]: { battery1: number; battery2: number } };
  motion: { [key: string]: { x: string; y: string; z: string } };
  date: string;
  date_uploaded: string;
}

export interface ReportState {
  items: Report[];
}

const initState: ReportState = {
  items: [],
};

const reducer = (
  state: ReportState = initState,
  action: AnyAction
): ReportState => {
  switch (action.type) {
    case GET_REPORT:
      return {
        ...initState,
      };
    case GET_REPORT_SUCCESS:
      return {
        items: action.payload.data,
      };
    case GET_REPORT_FAILURE:
      return {
        ...initState,
      };
    default:
      return state;
  }
};

export default reducer;

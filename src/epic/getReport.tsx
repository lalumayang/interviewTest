import { ofType, ActionsObservable } from "redux-observable";
import { map, switchMap, catchError } from "rxjs/operators";
import { GET_REPORT, getReportSuccess, getReportFailure } from "./actions";
import { of } from "rxjs";
import { AjaxError, AjaxResponse, ajax } from "rxjs/ajax";

const getReportEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(GET_REPORT),
    switchMap(
      ({
        payload: {
          dateFrom,
          dateTo,
          battery1From,
          battery1To,
          battery2From,
          battery2To
        }
      }) =>
        ajax({
          url: `https://cors-anywhere.herokuapp.com/http://167.99.171.123:8080/api/report?dateFrom=${dateFrom}&dateTo=${dateTo}&battery1From=${battery1From}&battery1To=${battery1To}&battery2From=${battery2From}&battery2To=${battery2To}`,
          method: "GET"
        }).pipe(
          map((res: AjaxResponse) => getReportSuccess(res.response)),
          catchError((error: AjaxError) => of(getReportFailure(error.response)))
        )
    )
  );
export default getReportEpic;

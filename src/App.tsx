import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  createStyles,
  TableSortLabel,
} from "@material-ui/core";

import "./styles.css";
import { getReport } from "./epic/actions";
import { StoreState } from "./reducers/rootReducer";
import { Report } from "./reducers/report";

const useStyles = makeStyles(() =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

export default function App() {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const report = useSelector((state: StoreState) => state.report.items);
  let searchReport: Report[] = [];
  const columns = [
    "id",
    "lat",
    "long",
    "battery1",
    "battery2",
    "x",
    "y",
    "z",
    "date",
    "dateUploaded",
  ];

  useEffect(() => {
    dispatch(getReport("2020-05-01", "2020-05-30", 5, 100, 5, 100));
  }, [dispatch]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  const filterReport = () => {
    report.filter((date) => {
      if (date.id.includes(searchInput)) {
        searchReport.push(date);
      }
      return searchReport;
    });
  };
  // console.log(filterReport());
  const tableData = useCallback(() => {
    return searchReport.map((data, index) => {
      const {
        id,
        gps,
        battery,
        motion,
        date,
        date_uploaded: dateUploaded,
      } = data;
      const { lat, long } = gps;
      const { battery1, battery2 } = battery;
      const { x, y, z } = motion;
      return (
        <TableRow key={index}>
          <TableCell>{id}</TableCell>
          <TableCell>{lat}</TableCell>
          <TableCell>{long}</TableCell>
          <TableCell>{battery1}</TableCell>
          <TableCell>{battery2}</TableCell>
          <TableCell>{x}</TableCell>
          <TableCell>{y}</TableCell>
          <TableCell>{z}</TableCell>
          <TableCell>{date}</TableCell>
          <TableCell>{dateUploaded}</TableCell>
        </TableRow>
      );
    });
  }, [searchReport]);

  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const createSortHandler = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };
  const handleSortData = (order: any) => {
    const ascSort = order === "asc" ? 1 : -1;
    const descSort = order === "desc" ? 1 : -1;
    const sortReport = report.sort(function (a, b) {
      return Date.parse(a.date).valueOf() > Date.parse(b.date).valueOf()
        ? ascSort
        : descSort;
    });
    return sortReport;
  };

  const output = useCallback(() => {
    filterReport();
    handleSortData(order);
    return (
      <Table aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column}
                sortDirection={column === "date" ? order : false}
              >
                <TableSortLabel
                  active={column === "date"}
                  direction={column === "date" ? order : "asc"}
                  onClick={createSortHandler}
                >
                  {column}
                  {column === "date" ? (
                    <span className={classes.visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{tableData()}</TableBody>
      </Table>
    ); // eslint-disable-next-line
  }, [
    tableData,
    columns,
    filterReport,
    handleSortData,
    order,
    createSortHandler,
  ]);

  return (
    <div className="App">
      <TextField
        label="search"
        id="search"
        variant="outlined"
        value={searchInput}
        onChange={handleInputChange}
      />
      {output()}
    </div>
  );
}

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";
import { fontSize } from "@mui/system";

let price = 0;
export default function TableView() {
  const [loader, setLoader] = useState(50);
  const [data, setData] = useState([]);
  const performApiCall = async () => {
    try {
      let response = await axios.get(
        "https://api.coincap.io/v2/assets?limit=50"
      );
      setData(response.data.data);
      console.log("data", data);
      return response.data.data;
    } catch (e) {}
  };
  const handleClick = async () => {
    try {
      setLoader(loader + 50);
      let response = await axios.get(
        `https://api.coincap.io/v2/assets?limit=50&offset=${loader}`
      );
      setData([...data, ...response.data.data]);
    } catch (e) {}

    const formatter = (value, decimal) => {
      return parseFloat(parseFloat(value).toFixed(decimal)).toLocaleString(
        "en-IN",
        {
          useGrouping: true,
        }
      );
    };
  };
  useEffect(() => {
    performApiCall();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">VWAP (24Hr)</TableCell>
              <TableCell align="right">Supply</TableCell>
              <TableCell align="right">Volume (24Hr)</TableCell>
              <TableCell align="right">Change (24Hr)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el) => (
              <TableRow key={el.rank}>
                <TableCell component="th" scope="row">
                  {el.rank}
                </TableCell>
                <TableCell align="left" sx={{ display: "flex", gap: "10px" }}>
                  <img
                    src={`https://assets.coincap.io/assets/icons/${el.symbol.toLowerCase()}@2x.png`}
                    alt="logo"
                  />
                  <div className="name-title" sx={{ display: "flex" }}>
                    <h4>{el.name}</h4>
                    <p> {el.symbol}</p>
                  </div>
                </TableCell>
                <TableCell align="right">
                  {el.priceUsd.toLocaleString("en-IN", {
                    useGrouping: true,
                  })}
                </TableCell>
                <TableCell align="right">{el.marketCapUsd}</TableCell>
                <TableCell align="right">{el.vwap24Hr}</TableCell>
                <TableCell align="right">{el.supply}</TableCell>
                <TableCell align="right">{el.volumeUsd24Hr}</TableCell>
                <TableCell align="right">{el.changePercent24Hr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button onClick={handleClick}>Load More</button>
    </>
  );
}

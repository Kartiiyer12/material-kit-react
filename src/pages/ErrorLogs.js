import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';

import axios from "axios";
import moment from 'moment';



// function preventDefault(event) {
//   event.preventDefault();
// }
const errorTypes = ["CARDANO_ERROR", "USER_ERROR", "DB_ERROR", "APPLICATION_ERROR"];
const idStrMap = new Map();
idStrMap.set("user_id", "User ID");
idStrMap.set("txId", "Tx");
idStrMap.set("depositIds", "Deposit IDs");
idStrMap.set("migrationId", "Migration ID");
idStrMap.set("withdrawalRequestIds", "Withdrawl Req IDs");
idStrMap.set("withdrawalId", "Withdrawal ID");



export default function ErrorLogs() {
  const [data, setData] = useState([]);
  const [selectedErrorTypes, setSelectedErrorTypes] = useState(errorTypes);


  useEffect(() => {
    axios.get("/api/log")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Table sx={{overflow: 'auto'}}>
        <TableHead>
          <TableRow>
            <TableCell><b>Action</b></TableCell>
            <TableCell><b>Logs References</b></TableCell>
            <TableCell><b>Time Stamp</b></TableCell>
            <TableCell><b>Error Type</b></TableCell>
            <TableCell><b>Error Message</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map((log) => {
                        const error = JSON.parse(log.error ? log.error : "{}");
                        const ids = JSON.parse(log.supporting_ids ? log.supporting_ids : "{}");
                        if (log.user_id) {
                          ids.user_id = log.user_id;
                        }
                        return selectedErrorTypes.includes(error.type) ? (
                          <TableRow
                            key={log.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                          >
                            {<TableCell component="th" scope="row">
                              {log.action_key}
                            </TableCell>}
                            { <TableCell>{Object.keys(ids).map(key => {
                              const value = ids[key];
                              return (
                                <span className="idRow">
                                  <span className="idKey">
                                    {idStrMap.get(key)}: </span>
                                    {key === "txId" ? <Tooltip title={value}><a href={`https://preview.cexplorer.io/tx/${value}`} target="_blank" rel="noopener noreferrer">[explorer]</a></Tooltip> : value}
                                </span>
                              );
                            })}</TableCell>}
                            {<TableCell>{log.ts}</TableCell>}
                            {<TableCell>{error.type}</TableCell>}
                            { <Tooltip title={error.error}><TableCell className="errorMsg">{error.error}</TableCell></Tooltip>}
                          </TableRow>
                        ) : <></>;

          // {data.map((row) => (
            // <TableRow key={row.id}>
            //   <TableCell >{row.action_key}</TableCell>
            //   <TableCell>{row.supporting_ids}</TableCell>
            //   <TableCell style={{ whiteSpace: 'nowrap' }}>{moment(row.ts).format('DD-MM-YY LTS')}</TableCell>
            //   <TableCell>{row.error}</TableCell>
            // </TableRow>
                          })}
        </TableBody>
      </Table>
    </>
  );
}

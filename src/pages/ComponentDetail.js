import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from "axios";


// function preventDefault(event) {
//   event.preventDefault();
// }

export default function ComponentsDeployed() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/deploydetails")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <h2>Host - 95.11.221.119</h2>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Version</b></TableCell>
            <TableCell><b>Port No</b></TableCell>
            <TableCell><b>Status</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell >{row.component_name}</TableCell>
              <TableCell>{row.component_version}</TableCell>
              <TableCell>{row.port_no}</TableCell>
              <TableCell>{row.component_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

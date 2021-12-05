import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import {
  Box,
  Card as MuiCard,
  CardHeader,
  Chip as MuiChip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

import {  blue } from '@material-ui/core/colors'

import {PASSED, FAILED, BLOCKED, Untest} from './Constants';

import { spacing } from '@material-ui/system'


const Card = styled(MuiCard)(spacing)

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)}px);
`

const UnpaidTable = (props) => {
  const {data} = props;
  const [listdata,setListData] = useState([
    {
      id: "s",
      testexecutionname: "s",
      created_date: "s",
      updated_date: "s",
      status: "s",
      tester: {
        _id: "s",
        username: "s"
      }
    }
  ]);

  useEffect(()=> {
    setListData(data);
  },[data])
  
  return(
  <Card mb={3}>
    <CardHeader
      action={
        <Box>
          {/* <Chip label="This month" rgbcolor={blue[500]} /> */}
        </Box>
      }
      title="User Request"
    />

    <Paper>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Request Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listdata.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left"><Chip label={row.status} rgbcolor={
                  row.status === 'Approve' ? PASSED:'' ||
                  row.status === 'Reject' ? FAILED:'' ||
                  row.status === 'Request' ? BLOCKED:'' ||
                  row.status === '' ? Untest : ''
                } /></TableCell>
                <TableCell align="left">{row.request_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Paper>
  </Card>)
}

export default UnpaidTable

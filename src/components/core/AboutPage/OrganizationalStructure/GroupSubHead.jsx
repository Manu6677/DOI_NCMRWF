import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
  columnsSubStructureHead,
  rowsSubStructureHead,
} from '../../../../data/organizationalStructureHeadsData';
import { useSelector } from 'react-redux';

const GroupSubHeadTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { language } = useSelector((state) => state.language);
  const locale = language?.locale || 'en';

  return (
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="group subhead table">
          <TableHead>
            <TableRow>
              {columnsSubStructureHead.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: '#00203f',
                    color: 'white',
                    fontSize: '1.25rem',
                    padding: '12px',
                  }}
                >
                  {column.label[locale]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsSubStructureHead[locale]
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columnsSubStructureHead.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ color: '#003244', fontSize: '1rem' }}
                    >
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rowsSubStructureHead[locale].length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default GroupSubHeadTable;

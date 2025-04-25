import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

const EmployeeTable = ({
  title,
  data,
  loading,
  employeeTableHeader,
  showPagination,
  rowsPerPage,
  page,
  totalCount,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on search query (assuming 'name' is a valid field)
  const filteredData = data.filter((employee) =>
    employee.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        marginBottom: '2rem',
        padding: '1rem',
      }}
    >
      <h2 className="my-4 px-4 text-xl font-semibold text-blue-800">{title}</h2>

      {/* Search Input */}
      <TextField
        label="Search by Name"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ marginBottom: '1rem' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <TableContainer sx={{ maxHeight: '60vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {employeeTableHeader.map((column) => (
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
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={employeeTableHeader.length} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredData.length > 0 ? (
              filteredData.map((employee, index) => (
                <TableRow key={employee.id || index}>
                  {employeeTableHeader.map((column) => (
                    <TableCell key={`${employee.id || index}-${column.id}`}>
                      {employee[column.id] || '-'}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={employeeTableHeader.length} align="center">
                  No matching data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Display Pagination if applicable */}
      {showPagination && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default EmployeeTable;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVacancies } from '../../../services/operations/vacancyAPI';
import { setVacancyData, selectVacancies } from '../../../slices/vacancySlice';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

const ASSETS_BASE_URL = process.env.REACT_APP_ASSETS_BASE_URL_NEW;

const VacancyTable = () => {
  const dispatch = useDispatch();
  const vacancies = useSelector(selectVacancies); // Get vacancies from Redux store
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Fetch vacancies and dispatch to Redux store
  useEffect(() => {
    const getVacancies = async () => {
      try {
        const { data } = await fetchVacancies();
        dispatch(setVacancyData(data)); // Dispatch action to store data in Redux
      } catch (error) {
        console.error('Error fetching vacancies:', error);
      }
    };

    getVacancies();
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    // { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'advt_no', label: 'Advt No', minWidth: 100 },
    { id: 'vacancy_name', label: 'Vacancy Name', minWidth: 200 },
    { id: 'download_title', label: 'Download', minWidth: 200 },
    { id: 'venue', label: 'Venue', minWidth: 150 },
    { id: 'last_date', label: 'Last Date', minWidth: 120 },
  ];

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '1rem' }}>
      <TableContainer sx={{ maxHeight: '60vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: '#00203f',
                    color: 'white',
                    fontSize: '1rem',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {vacancies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((vacancy, i) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'vacancy_name' ? (
                        // Handle vacancy_name with line breaks and commas
                        <div className="whitespace-pre-wrap">
                          {Array.isArray(vacancy.vacancy_name)
                            ? vacancy.vacancy_name.map((name, i) => (
                                <span key={i}>
                                  {name}
                                  {i < vacancy.vacancy_name.length - 1 &&
                                    ',\n\n'}
                                </span>
                              ))
                            : vacancy.vacancy_name}
                        </div>
                      ) : column.id === 'download_title' ? (
                        // Handle download links with comma, line break, and NEW badge
                        <div className="whitespace-pre-wrap">
                          {vacancy.download_title?.map((title, index) => (
                            <span key={index}>
                              <Link
                                to={`${ASSETS_BASE_URL}${vacancy.link?.[index]}`}
                                className="text-blue-600"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {title}
                              </Link>
                              {index < vacancy.download_title.length - 1
                                ? ',\n\n'
                                : ''}
                            </span>
                          ))}
                          {vacancy.most_recent && (
                            <span className="ml-2 inline-block rounded bg-red-600 px-1.5 py-0.5 align-middle text-[10px] font-bold text-white">
                              NEW
                            </span>
                          )}
                        </div>
                      ) : (
                        vacancy[column.id]
                      )}
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
        count={vacancies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default VacancyTable;

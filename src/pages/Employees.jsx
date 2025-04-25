import React, { useEffect, useState } from 'react';
import EmployeeTable from '../components/core/Employees/EmployeeTable';
import FilterButtons from '../components/core/Employees/FilterButtons';
import FilterTitle from '../components/core/Employees/FilterTitle';
import { fetchEmployees } from '../services/operations/allemployeesAPI';
import { employeeTableHeader } from '../data/employees';

const EmployeePage = () => {
  const [filter, setFilter] = useState('scientists');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true);

      try {
        setEmployees({ permanentStaff: [], contractStaff: [] });

        let data;
        if (filter === 'administrator') {
          data = await fetchEmployees(1, 50, filter);
          setEmployees({
            permanentStaff: data.data.permanentStaff || [],
            contractStaff: data.data.contractStaff || [],
          });
          setTotalCount(data.totalCount || 0);
        } else {
          // Fetch data for other filters like scientists, hindi_section, etc.
          data = await fetchEmployees(page + 1, rowsPerPage, filter);
          setEmployees({ data: data.data || [] });
          setTotalCount(data.totalCount || 0);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [filter, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-8">
      <div className="flex justify-end pt-4">
        <FilterButtons filter={filter} setFilter={setFilter} />
      </div>

      <FilterTitle filter={filter} />

      {filter === 'administrator' ? (
        <>
          <EmployeeTable
            title="Permanent Staff"
            data={
              Array.isArray(employees.permanentStaff)
                ? employees.permanentStaff
                : []
            }
            loading={loading}
            employeeTableHeader={employeeTableHeader}
            showPagination={false}
            rowsPerPage={rowsPerPage}
            page={page}
            totalCount={totalCount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />

          <EmployeeTable
            title="Contract Staff"
            data={
              Array.isArray(employees.contractStaff)
                ? employees.contractStaff
                : []
            }
            loading={loading}
            employeeTableHeader={employeeTableHeader}
            showPagination={false}
            rowsPerPage={rowsPerPage}
            page={page}
            totalCount={totalCount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      ) : filter === 'hindi_section' ? (
        <>
          <EmployeeTable
            title="Hindi Section"
            data={(employees.data || []).filter(
              (emp) => emp.ext === '428' || emp.ext === '515'
            )}
            loading={loading}
            employeeTableHeader={employeeTableHeader}
            showPagination={false}
            rowsPerPage={rowsPerPage}
            page={page}
            totalCount={totalCount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />

          <EmployeeTable
            title="Departmental Official Language Implementation/Execution Committee"
            data={(employees.data || []).filter(
              (emp) => emp.ext !== '428' && emp.ext !== '515'
            )}
            loading={loading}
            employeeTableHeader={employeeTableHeader}
            showPagination={false}
            rowsPerPage={rowsPerPage}
            page={page}
            totalCount={totalCount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <EmployeeTable
          title="Employees"
          data={employees.data || []}
          loading={loading}
          employeeTableHeader={employeeTableHeader}
          showPagination={true}
          rowsPerPage={rowsPerPage}
          page={page}
          totalCount={totalCount}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};

export default EmployeePage;

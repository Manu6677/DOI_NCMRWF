const ReusableTable = ({ title, columns, data, contact, subheading }) => {
  return (
    <div className="mt-14 overflow-x-auto px-6">
      <div className="space-y-1 pb-6 text-center text-3xl font-semibold text-slate-600">
        <p>{title}</p>
        <p>{subheading}</p>
        <p>{contact}</p>
      </div>
      <table className="w-full table-auto overflow-hidden rounded-2xl bg-white text-center shadow-md">
        <thead className="bg-blue-800 text-white">
          <tr className="border-b border-black">
            {columns.map((col, index) => (
              <th
                key={index}
                className="border border-white px-4 py-2 font-bold"
              >

                {col.header}
              </th>
            ))}
          </tr>
        </thead>  
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} py-2`}
                >
                  {col.accessor === 'email'
                    ? row[col.accessor]
                      ? `${row[col.accessor]}@ncmrwf.gov.in`
                      : '-'
                    : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;

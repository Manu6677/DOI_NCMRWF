// src/pages/MonthlyReportsPage.jsx
import { useParams } from 'react-router-dom';
import ReportGrid from './ReportGrid'; // We will create this next

const MonthlyReportsPage = ({ defaultType = 'global' }) => {
  let { reportType } = useParams(); // Get 'global' or 'regional' from URL

  reportType = reportType || defaultType;

  // Capitalize the first letter for the title
  const formattedType = reportType
    ? reportType.charAt(0).toUpperCase() + reportType.slice(1)
    : 'Unknown';

  // Basic validation or default
  const isValidType = reportType === 'global' || reportType === 'regional';

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-800">
        Monthly Verification Reports - {isValidType ? formattedType : 'Error'}
      </h2>

      {isValidType ? (
        <ReportGrid reportType={reportType} />
      ) : (
        <p className="text-red-600">Invalid report type specified in URL.</p>
      )}
    </div>
  );
};

export default MonthlyReportsPage;

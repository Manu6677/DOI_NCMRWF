import { useParams, Link } from 'react-router-dom';
import { notices } from '../../../../data/rajbhasha';

const RajbhashaProgram = () => {
  const { id } = useParams();
  const program = notices.find((notice) => notice.id === parseInt(id));

  if (!program)
    return (
      <p className="mt-10 text-center text-xl">कोई जानकारी उपलब्ध नहीं है।</p>
    );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-3xl font-bold text-red-700">
          {program.title}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {program.reports.map((report, index) => (
            <div
              key={index}
              className="rounded-lg bg-slate-50 p-4 text-center shadow-md transition duration-300 ease-in-out hover:bg-slate-100"
            >
              <a
                href={report.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg font-semibold text-blue-600"
              >
                {report.year}
              </a>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/rajbhasha-portal"
            className="text-sm text-blue-600 hover:underline"
          >
            ← वापस जाएं
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RajbhashaProgram;

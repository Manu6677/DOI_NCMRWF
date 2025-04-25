import { useNavigate } from 'react-router-dom';
const ASSETS_BASE_URL = process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

const forms = [
  { title: 'Library Membership Form', link: 'download-forms/membership' },
  {
    title: 'Canteen Demand Form',
    link: '/Documents/Forms/Canteen_demand%20form.pdf',
  },
  { title: 'CL Leave Form', link: '/Documents/Forms/CL%20leave_form_PDF.pdf' },
  { title: 'EL Leave Form', link: '/Documents/Forms/EL_Leave%20form_pdf.pdf' },
  { title: 'Gate Pass', link: '/Documents/Forms/Gate_pass_PDF.pdf' },
  { title: 'Guest House', link: '/Documents/Forms/Guest%20House_PDF.pdf' },
  { title: 'Joining Report', link: '/Documents/Forms/Joining_report_pdf.pdf' },
  {
    title: 'Newspaper Reimbursement Claim Form',
    link: '/Documents/Forms/Lib%20New%20demand%20form_Hindi%20version.pdf',
  },
  {
    title: 'Sc-G Above Tour Programme Form',
    link: '/Documents/Forms/Sc-G%20Above_tour%20programme%20form_PDF.pdf',
  },
  {
    title: 'Staff Car Demand Form',
    link: '/Documents/Forms/Staff-Car-Demand-Form.pdf',
  },
  {
    title: 'Stationery Demand Form',
    link: '/Documents/Forms/Stationory%20Demand_form%20PDF.pdf',
  },
  {
    title: 'VC Rooms Demands Form',
    link: '/Documents/Forms/VC-Form-English.pdf',
  },
];

const DownloadForms = () => {
  const navigate = useNavigate();

  const handleOpenForm = (link, title) => {
    console.log(link, title);
    if (link === 'download-forms/membership') {
      const correctedLink = link.startsWith('/') ? link : `/${link}`;
      navigate(correctedLink);
    } else {
      const formLink = link.startsWith('http')
        ? link
        : `${ASSETS_BASE_URL}${link}`;
      window.open(formLink, '_blank');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Download Forms</h1>
        <ul className="space-y-3">
          {forms.map((form, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b p-3"
            >
              <span className="text-lg">{form.title}</span>
              <button
                onClick={() => handleOpenForm(form.link)}
                className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Open
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DownloadForms;

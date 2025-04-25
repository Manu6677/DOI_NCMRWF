import DocumentTable from './DocumentTable';
import { documents } from '../../../data/library-member-ship-data';

const MembershipForm = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-center text-2xl font-bold">Library Forms</h1>
      <DocumentTable language="en" documents={documents} />
    </div>
  );
};

export default MembershipForm;

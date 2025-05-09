import ReusableTable from './Table';
import { ncmrwfHead } from '../../../data/contact-us';
import { columnsContactUs } from '../../../data/contact-us';

const ContactHead = () => {
  return (
    <ReusableTable
      title="OFFICE OF HEAD"
      subheading="NCMRWF"
      contact="FAX N: 0120-2419484,2419494"
      columns={columnsContactUs}
      data={ncmrwfHead}
    />
  );
};
export default ContactHead;

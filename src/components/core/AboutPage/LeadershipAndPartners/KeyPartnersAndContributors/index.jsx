import React from 'react';
import KeyPartnersAndContributorsItem from './KeyPartnersAndContributorsItem';
import employeeImg from '../../../../../assets/images/employees.png';
import stakeholdersImg from '../../../../../assets/images/beneficiary.png';
import collaboratorsImg from '../../../../../assets/images/collaborators.png';

const dataList = [
  {
    img: employeeImg,
    text: {
      en: 'employees',
      hi: 'कर्मचारी',
    },
    link: '/employees',
  },
  {
    img: stakeholdersImg,
    text: {
      en: 'stakeholders',
      hi: 'हितधारक',
    },
    link: '/stakeholders',
  },
  {
    img: collaboratorsImg,
    text: {
      en: 'collaborators',
      hi: 'सहयोगी',
    },
    link: '/collaborators',
  },
];

const KeyPartnersAndContributors = () => {
  return (
    <div className="bg-light-default py-4">
      <div className="container mx-auto mb-12 w-9/12 px-6">
        <div className="my-8 text-center">
          <h2 className="text-4xl font-semibold text-slate-700">
            Our Key Partners and Contributors
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dataList.map((data, i) => (
            <div key={i} className="col-span-1">
              <KeyPartnersAndContributorsItem items={data} id={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyPartnersAndContributors;

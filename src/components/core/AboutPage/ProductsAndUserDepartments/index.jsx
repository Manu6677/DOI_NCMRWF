import React from 'react';
import { useSelector } from 'react-redux';
import SliderComponent from '../../../common/SliderComponent';
import departments from '../../../../data/departments-data';

const ProductsAndUserDepartments = () => {
  const { language } = useSelector((state) => state.language);
  const locale = language?.locale;

  const sliderItems = departments.map((department) => ({
    title: department.title[locale],
    description: (
      <>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-slate-600">
          {department.items.en.map((item, idx) => (
            <li key={idx}>{item[locale]}</li>
          ))}
        </ul>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-slate-600">
          {department.items.hi.map((item, idx) => (
            <li key={idx}>{item[locale]}</li>
          ))}
        </ul>
      </>
    ),
    image: department.imageSrc,
    imageAlt: department.imageAlt,
  }));

  return (
    <div className="bg-light-default py-6">
      <div className="container mx-auto w-10/12 px-6">
        <h2 className="mb-8 text-center text-4xl font-semibold text-slate-700">
          NCMRWF - Products & User Departments
        </h2>
        <p className="mb-12 text-center text-lg text-slate-600">
          NCMRWF provides its routine and special products for operational
          forecasting to various organizations regularly or upon special
          request. Here is a list of user departments that utilize NCMRWF’s
          products.
        </p>
        <SliderComponent items={sliderItems} />
      </div>
    </div>
  );
};

export default ProductsAndUserDepartments;

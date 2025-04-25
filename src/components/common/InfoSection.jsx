import React from 'react';

const InfoSection = ({ title, description, imageSrc, imageAlt, className }) => {
  return (
    <div
      className={`${className} mx-auto mt-7 flex min-h-full w-10/12 flex-col gap-4 lg:flex-row`}
    >
      <div className="flex flex-1 flex-col items-baseline justify-center px-4">
        <h2 className="mb-2 text-4xl font-semibold text-slate-700">{title}</h2>
        <p className="text-start text-lg">{description}</p>
      </div>
      <div className="flex flex-1 justify-center">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-[20rem] w-[33rem]" // Ensures the image fits well within its container
        />
      </div>
    </div>
  );
};

export default InfoSection;

import { IoSearchOutline, IoLocationOutline } from 'react-icons/io5';

const JobSearchForm = ({
  formName,
  register,
  handleSubmit,
  onSubmit,
  formStyle,
  fieldStyle,
  inputContainerStyle,
  btnStyle,
}) => {
  return (
    <form className={formStyle} onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`flex flex-col items-start gap-1 ${formName === 'allJobs' ? 'border-r border-r-richblack-25' : 'border-none'}`}
      >
        <label
          htmlFor="jobTitle"
          className="text-sm font-medium dark:text-white"
        >
          Search by Job Title
        </label>
        <div className={inputContainerStyle}>
          <IoSearchOutline />
          <input
            id="jobTitle"
            type="text"
            {...register('jobTitle')}
            placeholder="Project scientist"
            className={fieldStyle}
          />
        </div>
      </div>

      <div className="flex flex-col items-baseline gap-1">
        <label
          htmlFor="location"
          className="text-sm font-medium dark:text-white"
        >
          Enter Location
        </label>
        <div className={inputContainerStyle}>
          <IoLocationOutline />
          <input
            id="location"
            type="text"
            {...register('location')}
            placeholder="Location"
            className={fieldStyle}
          />
        </div>
      </div>

      <button type="submit" aria-label="Find Jobs" className={btnStyle}>
        Find Jobs
      </button>
    </form>
  );
};

export default JobSearchForm;

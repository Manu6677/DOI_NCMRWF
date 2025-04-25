import { Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

const ApplyJobForm = ({ onSubmit, jobId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-2xl transition-all duration-300 hover:shadow-xl">
      <h3 className="text-gray-800 mb-6 text-center text-3xl font-semibold">
        Apply for this job
      </h3>

      <form
        onSubmit={handleSubmit((data) => onSubmit(data, reset))}
        className="space-y-5"
      >
        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="text-gray-700 block text-lg font-medium"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: 'First name is required' })}
            className="border-gray-300 focus:ring-indigo-500 w-full rounded-lg border p-3 focus:outline-none focus:ring-2"
          />
          {errors.firstName && (
            <p className="py-1 text-sm font-semibold text-customRed-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="text-gray-700 block text-lg font-medium"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: 'Last name is required' })}
            className="border-gray-300 focus:ring-indigo-500 w-full rounded-lg border p-3 focus:outline-none focus:ring-2"
          />
          {errors.lastName && (
            <p className="py-1 text-sm font-semibold text-customRed-600">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-gray-700 block text-lg font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email format',
              },
            })}
            className="border-gray-300 focus:ring-indigo-500 w-full rounded-lg border p-3 focus:outline-none focus:ring-2"
          />
          {errors.email && (
            <p className="py-1 text-sm font-semibold text-customRed-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="text-gray-700 block text-lg font-medium"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            {...register('phone', { required: 'Phone number is required' })}
            className="border-gray-300 focus:ring-indigo-500 w-full rounded-lg border p-3 focus:outline-none focus:ring-2"
          />
          {errors.phone && (
            <p className="py-1 text-sm font-semibold text-customRed-600">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="text-gray-700 block text-lg font-medium"
          >
            Address
          </label>
          <textarea
            id="address"
            {...register('address', { required: 'Address is required' })}
            className="border-gray-300 focus:ring-indigo-500 w-full rounded-lg border p-3 focus:outline-none focus:ring-2"
          />
          {errors.address && (
            <p className="py-1 text-sm font-semibold text-customRed-600">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Qualification */}
        <div>
          <label
            htmlFor="qualification"
            className="text-gray-700 block text-lg font-medium"
          >
            Qualification
          </label>
          <input
            type="text"
            id="qualification"
            {...register('qualification', {
              required: 'Qualification is required',
            })}
            className="border-gray-300 focus:ring-indigo-500 w-full rounded-lg border p-3 focus:outline-none focus:ring-2"
          />
          {errors.qualification && (
            <p className="py-1 text-sm font-semibold text-customRed-600">
              {errors.qualification.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <label
            htmlFor="age"
            className="text-gray-700 block text-lg font-medium"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            {...register('age', {
              required: 'Age is required',
              min: { value: 18, message: 'Must be at least 18' },
              valueAsNumber: true,
            })}
            className="border-gray-300 focus:ring-indigo-500 w-full rounded-lg border p-3 focus:outline-none focus:ring-2"
          />
          {errors.age && (
            <p className="py-1 text-sm font-semibold text-customRed-600">
              {errors.age.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: 'orange',
            '&:hover': {
              backgroundColor: 'darkorange',
            },
          }}
          className="w-full rounded-lg py-3 text-2xl font-bold text-white transition duration-200"
        >
          Submit Application
        </Button>
      </form>
    </div>
  );
};

export default ApplyJobForm;

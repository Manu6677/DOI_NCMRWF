import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="bg-gray-100 flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-gray-800 text-9xl font-extrabold">404</h1>
      <h2 className="text-gray-700 mt-4 text-4xl font-bold">Page Not Found</h2>
      <p className="text-gray-600 mt-2 text-lg">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-md bg-blue-500 px-8 py-3 font-medium text-white transition hover:bg-blue-600"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;

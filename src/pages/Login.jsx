import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { loginUser } from '../services/operations/authAPI';
import ncmrwfLogo from '../assets/images/NCMRWF_Logo_Hindi-English.png';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await loginUser(formData.email, formData.password);
      if (result && result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        navigate('/ncmnet'); // Redirect to the dashboard after login
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl sm:p-8 dark:bg-slate-900">
        <div className="flex flex-col items-center text-center">
          <img
            className="mb-4 size-14 sm:size-16"
            src={ncmrwfLogo}
            alt="NCMRWF Logo"
          />
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            Welcome to NCMRWF
          </h1>
          <p className="mt-1 text-sm text-slate-600 sm:text-base dark:text-slate-400">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-slate-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-slate-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-base font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          {/* <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Don’t have an account?{' '}
            <a
              href="/signup"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign up
            </a>
          </p> */}
        </form>
      </div>
    </section>
  );
};

export default Login;

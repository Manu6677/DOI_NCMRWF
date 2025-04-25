import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { registerUser } from '../services/operations/authAPI';
import ncmrwfLogo from '../assets/images/NCMRWF_Logo_Hindi-English.png';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await registerUser(formData);
      if (result) {
        toast.success('Account created successfully! Please log in.');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl dark:bg-slate-900">
        <div className="flex flex-col items-center">
          <img className="mb-6 size-16" src={ncmrwfLogo} alt="NCMRWF Logo" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Create an Account
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Sign up to get started
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border-slate-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="Your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border-slate-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border-slate-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border-slate-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;

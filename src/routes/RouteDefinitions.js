import Home from '../pages/Home';
import About from '../pages/About';
import DirectorDesk from '../components/core/AboutPage/DirectorDesk';
import Careers from '../pages/Careers';
import Research from '../pages/Research';
import AllSpecialProducts from '../pages/AllSpecialProducts';
// import ForecastProducts from '../pages/ForecastProducts';
import Employees from '../pages/Employees';
import Error from '../pages/Error';

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/about-us', element: <About /> },
  { path: '/about/directors-desk', element: <DirectorDesk /> },
  { path: '/about/careers', element: <Careers /> },
  { path: '/research', element: <Research /> },
  { path: '/special-products', element: <AllSpecialProducts /> },
  // { path: '/forecast-products/:modelType', element: <ForecastProducts /> },
  { path: '/about-us/employees', element: <Employees /> },
  { path: '*', element: <Error /> },
];

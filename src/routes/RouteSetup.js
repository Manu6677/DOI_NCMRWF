import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './RouteDefinitions';
import Spinner from '../components/common/Spinner';

const RouteSetup = () => {
  console.log(routes);
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route?.path}
          element={
            <React.Suspense fallback={<Spinner />}>
              {route?.element}
            </React.Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default RouteSetup;

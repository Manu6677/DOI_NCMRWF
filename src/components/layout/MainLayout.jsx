// src/components/layout/MainLayout.js
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet to render child routes
import TitleBar from '../common/TitleBar'; // Keep common layout parts eagerly loaded
import Navbar from '../common/Navbar'; // for stable UI structure
import Footer from '../common/Footer';
import Spinner from '../common/Spinner'; // Fallback for Outlet

function MainLayout() {
  return (
    <>
      {/* TitleBar and Navbar are part of the persistent layout */}
      {/* No need for Suspense here unless TitleBar/Navbar *internally* use it */}
      <TitleBar />
      <Navbar />

      {/* Main content area where routed components will be rendered */}
      {/* Suspense here handles the loading state for *all* lazy-loaded child routes */}
      <Suspense fallback={<Spinner />}>
        <main className="main-content-area">
          {' '}
          <Outlet /> {/* Child routes render here */}
        </main>
      </Suspense>

      {/* Footer is also part of the persistent layout */}
      <Footer />
    </>
  );
}

export default MainLayout;

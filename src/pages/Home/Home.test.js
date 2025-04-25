import { render, screen, fireEvent } from '@testing-library/react';
import Home from './index'; // Correct import for Home/index.js
import '@testing-library/jest-dom'; // for matchers like toBeInTheDocument

// Mocking the imported components
jest.mock('../../components/core/HomePage/HeroSection', () => () => (
  <div data-testid="hero-section">Hero Section</div>
));
jest.mock('../../components/core/HomePage/ImpactOverview', () => () => (
  <div data-testid="impact-overview">Impact Overview</div>
));
jest.mock('../../components/core/HomePage/SpecialProducts', () => () => (
  <div data-testid="special-products">Special Products</div>
));
jest.mock('../../components/core/HomePage/VideoAndPartnerSection', () => () => (
  <div data-testid="video-and-partner-section">Video and Partner Section</div>
));
jest.mock('../../components/common/CustomModal', () => ({
  __esModule: true,
  default: ({ open, setOpen, componentToRender }) =>
    open ? (
      <div data-testid="custom-modal">
        <button onClick={setOpen} data-testid="close-modal">
          Close
        </button>
        {componentToRender}
      </div>
    ) : null,
}));
jest.mock('../../components/core/HomePage/TestimonialSection', () => () => (
  <div data-testid="testimonial-section">Testimonial Section</div>
));

describe('Home Page', () => {
  it('renders all sections correctly', () => {
    render(<Home />);

    // Check for Hero Section
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();

    // Check for Impact Overview Section
    expect(screen.getByTestId('impact-overview')).toBeInTheDocument();

    // Check for Special Products Section
    expect(screen.getByTestId('special-products')).toBeInTheDocument();

    // Check for Video and Partner Section
    expect(screen.getByTestId('video-and-partner-section')).toBeInTheDocument();

    // Check for the Bulletin board icon
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens and closes the testimonial modal', () => {
    render(<Home />);

    // Find and click the Bulletin board icon
    const iconButton = screen.getByRole('button');
    fireEvent.click(iconButton);

    // Check if the modal opens with Testimonial Section
    expect(screen.getByTestId('custom-modal')).toBeInTheDocument();
    expect(screen.getByTestId('testimonial-section')).toBeInTheDocument();

    // Close the modal
    const closeButton = screen.getByTestId('close-modal');
    fireEvent.click(closeButton);

    // Check if the modal closes
    expect(screen.queryByTestId('custom-modal')).not.toBeInTheDocument();
  });
});

import { Link } from 'react-router-dom';

const Breadcrumbs = ({ selectedModel, selectedProduct }) => {
  return (
    <nav className="text-gray-600 mb-4 flex items-center text-sm">
      <Link to="/" className="hover:underline">
        Home
      </Link>
      <span className="mx-2">/</span>
      {selectedModel ? (
        <>
          <span className="font-semibold capitalize">
            {selectedModel.alias}
          </span>
          {selectedProduct && (
            <>
              <span className="mx-2">/</span>
              <span className="font-semibold capitalize">
                {selectedProduct.product_name}
              </span>
            </>
          )}
        </>
      ) : (
        <span className="font-semibold">Select a Model</span>
      )}
    </nav>
  );
};

export default Breadcrumbs;

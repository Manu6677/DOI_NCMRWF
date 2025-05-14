import React, { useState, useEffect } from 'react';
import { SubMenu, MenuItem } from 'react-pro-sidebar';
import {
  fetchModels,
  getModelWiseForecastProducts,
} from '../../../../services/operations/forecastAPI';
import toast from 'react-hot-toast';
import { FaCloudSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedModel } from '../../../../slices/modelSlice';
import {
  setModelProducts,
  clearModelProducts,
} from '../../../../slices/modelProductsSlice';
// Removed unused import setSelectedSpecialProduct
import { useNavigate } from 'react-router-dom';

const DEFAULT_MODEL_ID = 1; // Default model ID

const ModelSubMenu = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const selectedModel = useSelector((state) => state.forecast.selectedModel);
  const dispatch = useDispatch();

  // Fetch all models and set the default model if not selected
  useEffect(() => {
    const fetchAllModels = async () => {
      setLoading(true);
      try {
        const modelsData = await fetchModels();
        if (!modelsData || modelsData.length === 0) {
          // Consider if toast is needed here, might annoy user if API is flaky
          // toast.error('No models found');
          console.warn('No models found from API.');
          setModels([]); // Ensure models is empty array
          return;
        }

        setModels(modelsData.models);
        // console.log('Fetched Models:', modelsData.models); // Log to check available fields

        // Set default model only if no model is currently selected in Redux state
        if (!selectedModel && modelsData.models.length > 0) {
          const defaultModel =
            modelsData.models.find((m) => m.model_id === DEFAULT_MODEL_ID) ||
            modelsData.models[0]; // Fallback to the first model

          if (defaultModel) {
            console.log('defaultModel selectedModel -> ', selectedModel);
            // dispatch(setSelectedModel(defaultModel));
          }
        }
      } catch (error) {
        console.error('Error fetching models:', error);
        // toast.error('Failed to fetch models'); // Maybe only show toast on persistent failure
      } finally {
        setLoading(false);
      }
    };

    fetchAllModels();
    // Dependency array: run only once on mount or if dispatch changes (unlikely)
    // selectedModel is removed as dependency to avoid re-fetching models when selection changes
  }, [dispatch]);

  // Fetch model-wise forecast products when the selected model changes
  useEffect(() => {
    // Ensure selectedModel and its ID exist before fetching
    if (!selectedModel?.model_id) {
      // If no model is selected (e.g., initially or after an error), clear products
      dispatch(clearModelProducts());
      return;
    }

    const fetchModelProducts = async () => {
      try {
        const response = await getModelWiseForecastProducts(
          selectedModel.model_id
        );

        // Check if response has products array
        if (response?.products && response.products.length > 0) {
          dispatch(setModelProducts(response.products));
        } else {
          // Clear products if API returns empty or no products array
          // console.log(`No forecast products available for model ID: ${selectedModel.model_id}`);
          // toast.info('No forecast products available for the selected model.'); // Use info level
          dispatch(clearModelProducts());
        }
      } catch (error) {
        console.error('Error fetching forecast products:', error);
        toast.error(
          'Error fetching forecast products.' // Simplified error message
        );
        dispatch(clearModelProducts()); // Clear products on error
      }
    };

    fetchModelProducts();
  }, [selectedModel, dispatch]); // Re-run when selectedModel or dispatch changes

  const handleRadioButtonChange = (model) => {
    // Only dispatch if the selected model is actually different
    if (selectedModel?.model_id !== model.model_id) {
      dispatch(setSelectedModel(model));
      // Navigate only after selecting a new model if needed,
      // or perhaps navigation isn't needed here if the dashboard updates based on Redux state.
      // If navigation is required on *every* click, keep it here. If only on *change*, keep it inside the if block.
      navigate('/forecast-dashboard/model-products');
    }
    // If navigation should happen even if clicking the same model, keep it outside the 'if'
    navigate('/forecast-dashboard/model-products');
  };

  return (
    <SubMenu
      label="Forecast Models"
      icon={<FaCloudSun size={20} />} // Added size for better visibility
      // Consider moving styles to CSS/Tailwind classes if possible
      style={{ pointerEvents: 'auto', backgroundColor: '#003244' }}
      // Increased padding/margin for better spacing
      className="my-2 text-lg"
      defaultOpen={true} // Keep menu open by default
    >
      {loading && (
        <MenuItem style={{ color: '#e0f2ff', backgroundColor: '#003244' }}>
          Loading models...
        </MenuItem>
      )}
      {!loading && models.length === 0 && (
        <MenuItem
          style={{
            pointerEvents: 'none',
            color: '#b3e0ff',
            backgroundColor: '#003244',
          }}
        >
          No models available
        </MenuItem>
      )}
      {!loading &&
        models.length > 0 &&
        models.map((model) => (
          <MenuItem
            key={model.model_id}
            style={{
              pointerEvents: 'auto',
              backgroundColor: '#003244', // Base background
              color: '#e0f2ff', // Default text color
            }}
            // Added hover effect class (assuming you have Tailwind or CSS for this)
            className="hover:bg-blue-800" // Example hover effect using Tailwind
            // Add the title attribute for the tooltip
            // It will show model_name if available, otherwise alias
            title={model.model_name || model.alias}
          >
            {/* Label now takes full width for better clickability */}
            <label className="flex w-full cursor-pointer items-center space-x-3 py-1">
              {' '}
              {/* Adjusted spacing/padding */}
              <input
                type="radio"
                name="forecastModel"
                value={model.alias}
                checked={selectedModel?.model_id === model.model_id}
                onChange={() => handleRadioButtonChange(model)}
                // Slightly larger radio button, better focus ring
                // className="size-4 flex-shrink-0 cursor-pointer appearance-none rounded-full border border-blue-200 text-blue-500 checked:border-blue-400 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-[#003244]"
                className="size-4 flex-shrink-0 cursor-pointer appearance-none rounded-full border border-blue-200 text-white checked:border-white checked:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#003244]"
              />
              {/* Ensure text doesn't wrap awkwardly */}
              <span className="flex-grow truncate text-base capitalize">
                {model.alias}
              </span>
            </label>
          </MenuItem>
        ))}
    </SubMenu>
  );
};

export default ModelSubMenu;

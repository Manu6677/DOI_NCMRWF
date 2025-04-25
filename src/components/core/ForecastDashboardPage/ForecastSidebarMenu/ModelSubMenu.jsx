import { useState, useEffect } from 'react';
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
import { setSelectedSpecialProduct } from '../../../../slices/specialProductsSlice';
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
          toast.error('No models found');
          return;
        }

        setModels(modelsData.models);

        if (!selectedModel) {
          const defaultModel =
            modelsData.models.find((m) => m.model_id === DEFAULT_MODEL_ID) ||
            modelsData.models[0];

          dispatch(setSelectedModel(defaultModel));
        }
      } catch (error) {
        console.error('Error fetching models:', error);
        // toast.error('Failed to fetch models');
      } finally {
        setLoading(false);
      }
    };

    fetchAllModels();
  }, [dispatch, selectedModel]);

  // Fetch model-wise forecast products when the selected model changes
  useEffect(() => {
    if (!selectedModel) return;

    const fetchModelProducts = async () => {
      try {
        const response = await getModelWiseForecastProducts(
          selectedModel.model_id
        );
        if (!response || response.products.length === 0) {
          // toast.error('No forecast products available for the selected model.');
          dispatch(clearModelProducts());
          return;
        }
        dispatch(setModelProducts(response.products));
      } catch (error) {
        console.error('Error fetching forecast products:', error);
        toast.error(
          'Unexpected error occurred while fetching forecast products.'
        );
      }
    };

    fetchModelProducts();
  }, [selectedModel, dispatch]);

  const handleRadioButtonChange = (model) => {
    navigate('/forecast-dashboard/');
    if (selectedModel?.model_id !== model.model_id) {
      dispatch(setSelectedModel(model));
    }
  };

  return (
    <SubMenu
      label="Forecast Models"
      icon={<FaCloudSun />}
      style={{ pointerEvents: 'auto', backgroundColor: '#003244' }}
      className="my-4 text-lg"
      defaultOpen={true}
    >
      {loading && <div>Loading forecast models...</div>}
      {models.length > 0 ? (
        models.map((model) => (
          <MenuItem
            key={model.model_id}
            style={{
              pointerEvents: 'auto',
              backgroundColor: '#003244',
              color: '#e0f2ff',
            }}
            className="capitalize"
          >
            <label className="flex cursor-pointer items-center space-x-4">
              <input
                type="radio"
                name="forecastModel"
                value={model.alias}
                checked={selectedModel?.model_id === model.model_id}
                onChange={() => handleRadioButtonChange(model)}
                className="size-4 text-blue-500"
              />
              <span className="text-base capitalize">{model.alias}</span>
            </label>
          </MenuItem>
        ))
      ) : (
        <MenuItem
          style={{ pointerEvents: 'none', backgroundColor: 'transparent' }}
        >
          No models available
        </MenuItem>
      )}
    </SubMenu>
  );
};

export default ModelSubMenu;

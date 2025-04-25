import { combineReducers } from '@reduxjs/toolkit';
import langReducer from '../slices/languageSlice';
import bulletinReducer from '../slices/bulletinSlice';
import jobsReducer from '../slices/jobsSlice';
import forecastModelReducer from '../slices/modelSlice';
import modelProductsReducer from '../slices/modelProductsSlice';
import openingReducer from '../slices/openingSlice';
import allEmployeesReducer from '../slices/allEmployeesSlice';
import specialProductsReducer from '../slices/specialProductsSlice';
import allSpecialProductsIdReducer from '../slices/allSpecialProductsSliceId';
import utcReducer from '../slices/utcSlice';
import paginationReducer from '../slices/paginationSlice';
import forecastModelsReducer from '../slices/modelProductsSlice';
import specialForecastProductsReducer from '../slices/allSpecialProductsSliceId';
import allBimstecReducer from '../slices/bimstecSlice';
import observationProductsReducer from '../slices/observationProductsSlice';

const rootReducer = combineReducers({
  language: langReducer,
  bulletin: bulletinReducer,
  jobs: jobsReducer,
  forecast: forecastModelReducer,
  modelProducts: modelProductsReducer,
  openings: openingReducer,
  allEmployees: allEmployeesReducer,
  specialProducts: specialProductsReducer,
  allSpecialProductsId: allSpecialProductsIdReducer,
  utc: utcReducer,
  pagination: paginationReducer,
  forecastModels: forecastModelsReducer,
  specialForecastProducts: specialForecastProductsReducer,
  allBimstec: allBimstecReducer,
  observationProducts: observationProductsReducer,
});

export default rootReducer;

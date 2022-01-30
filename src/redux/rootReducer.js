import { combineReducers } from 'redux';
// slices
import productReducer from './slices/product';

// ----------------------------------------------------------------------


const rootReducer = combineReducers({
  product: productReducer,
});

export { rootReducer };

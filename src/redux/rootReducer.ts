import { combineReducers } from 'redux';
import { centerReducer } from './centerReducer';
import { markersReducer } from './markersReducer';

/**
 * Основной редьюсер, принимает в себя все остальные редьюсеры
 */
export const rootReducer = combineReducers({
  markers: markersReducer,
  center: centerReducer,
});
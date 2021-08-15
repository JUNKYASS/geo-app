import { ActionTypes } from '../helpers/actionTypes';
import { ICenterAction, ICenterState } from '../helpers/interfaces';

const initialState: ICenterState = {
  coords: [37.6204, 55.7475], // Координаты центра карты
};

/**
 * Установка координат, отвечащих за центр карты
 */
export const centerReducer = (state = initialState, action: ICenterAction): ICenterState => {
  switch (action.type) {
    case ActionTypes.SET_CENTER: return { ...state, coords: action.payload }; // "Разворачиваем" объект стейта и устанавливаем новые координаты центра
    default: return state;
  }
};
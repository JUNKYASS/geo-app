import { ActionTypes } from '../helpers/actionTypes';
import { IMarkersAction, IMarkersState } from '../helpers/interfaces';

const initialState: IMarkersState = {
  markersData: [],
};

/**
 * Установка объекта точек, отображающихся на карте
 */
export const markersReducer = (state = initialState, action: IMarkersAction): IMarkersState => {
  switch (action.type) {
    case ActionTypes.SET_MARKERS: return {...state, markersData: action.payload}; // "Разворачиваем" объект стейта и записываем новый массив точек
    default: return state;
  }
};

// // Тестовые значения, возможно, понадобятся в будущем
// [
//   {
//     key: 1,
//     name: 'Санкт-Петербург',
//     lat: 59.939098,
//     lon: 30.315868,
//   },
//   {
//     key: 2,
//     name: 'Иваново',
//     lat: 56.9984,
//     lon: 40.9737,
//   },
//   {
//     key: 3,
//     name: 'Москва',
//     lat: 55.7475,
//     lon: 37.6204,
//   },
// ]
import { ActionTypes } from '../helpers/actionTypes';
import { IMarkersAction, IMarkersState } from '../helpers/interfaces';

const initialState: IMarkersState = {
  markersData: []
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
import { ICenterAction, IMarkersAction } from './interfaces';
import { ActionTypes } from './actionTypes';

export const setMarkersAction = (): IMarkersAction => {
  return {
    type: ActionTypes.SET_MARKERS,
    payload: [
      {
        key: 1,
        name: 'Санкт-Петербург',
        lat: 59.939098,
        lon: 30.315868,
      },
      {
        key: 2,
        name: 'Иваново',
        lat: 56.9984,
        lon: 40.9737,
      },
      {
        key: 3,
        name: 'Москва',
        lat: 55.7475,
        lon: 37.6204,
      },
    ],
  };
};

export const setCenterAction = (coords: number[]): ICenterAction => {
  return {
    type: ActionTypes.SET_CENTER,
    payload: coords,
  };
};
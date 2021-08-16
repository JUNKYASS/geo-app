import { ICenterAction, IMarkersAction, IPoint } from './interfaces';
import { ActionTypes } from './actionTypes';

export const setMarkersAction = (markers: IPoint[]): IMarkersAction => {
  return {
    type: ActionTypes.SET_MARKERS,
    payload: markers,
  };
};

export const setCenterAction = (coords: number[]): ICenterAction => {
  return {
    type: ActionTypes.SET_CENTER,
    payload: coords,
  };
};
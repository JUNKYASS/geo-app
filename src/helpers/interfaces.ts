export interface IPoint {
  key: number;
  name: string;
  lat: number;
  lon: number; 
}

export interface IMarkersAction {
  type: string;
  payload: IPoint[];
}

export interface IMarkersState {
  markersData: IPoint[];
}

export interface ICenterAction {
  type: string;
  payload: number[];
}

export interface ICenterState {
  coords: number[];
}

export interface IRootReducer {
  markers: IMarkersState;
  center: ICenterState;
}

export interface IMapProps {
  markers: IPoint[];
  center: number[];
}

export interface ITableProps {
  markersData?: IPoint[];
}
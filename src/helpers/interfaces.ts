export interface IPoint {
  key: number | string;
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
  caption: string;
}

export interface ITableProps {
  markersData?: IPoint[];
}

export interface IExpectedMarkerData {
  key: number; 
  name: string; 
  lat: string; 
  lon: string
}

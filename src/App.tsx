import React from 'react';
import { useDispatch } from 'react-redux';
import Map from './components/MapComponent';
import Table from './components/TableComponent';
import { setMarkersAction } from './helpers/actionCreators';
import { IExpectedMarkerData } from './helpers/interfaces';

import './style/app.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const addMarkersBtnHandler = (): void => { // Получаем данные из /order.json
    fetch('/orders.json')
      .then(result => result.json())
      .then(data => {
        const processedMarkers = data.Orders.map((marker: IExpectedMarkerData)  => { // Преобразуем в нужный нам вид
          return {
            key: marker.key, 
            name: marker.name, 
            lat: parseFloat(marker.lat), 
            lon: parseFloat(marker.lon)
          };
        });

        dispatch(setMarkersAction(processedMarkers));
      });
  };

  return (
    <React.Fragment>
      <header><h1>OL & React App</h1></header>
      <main>
        <aside className="sidebar">
          <div
            className="btn-common btn-marker js-btn-marker"
            data-text="Добавить точки"
            data-action="+"
            onClick={addMarkersBtnHandler}
          />
        </aside>

        <aside className="content">
          <Map />
        </aside>
      </main>
      <footer>
        <Table />
      </footer>
    </React.Fragment>
  );
};

export default App;

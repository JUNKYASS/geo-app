import React from 'react';
import { useDispatch } from 'react-redux';
import Map from './components/MapComponent';
import Table from './components/TableComponent';
import { setMarkersAction } from './helpers/actionCreators';

import './style/app.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <header><h1>OL & React App</h1></header>
      <main>
        <aside className="sidebar">
          <div
            className="btn-common btn-marker js-btn-marker"
            data-text="Добавить точки"
            data-action="+"
            onClick={() => dispatch(setMarkersAction())}
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

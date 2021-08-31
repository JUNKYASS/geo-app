import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { Map as OlMap, View, Feature } from 'ol';
import { VectorImage } from 'ol/layer';
import { Point } from 'ol/geom';
import { OSM, Vector } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { MeasureArea } from './measureArea';

import '../../style/map.scss';
import { IMapProps, IPoint, IRootReducer } from '../../helpers/interfaces';

const view = new View({ // Задаём начальный вью
  center: fromLonLat([37.6204, 55.7475]),
  zoom: 5,
});

const rasterLayer = new TileLayer({ // Основной растровый слой
  source: new OSM(),
});

const map = new OlMap({ // Задаём изначальные параметры карты
  layers: [rasterLayer],
  view,
});

const initMap = (map: OlMap, cb: (map: OlMap) => void) => {   // Функция инициализации карты
  map.setTarget('js-map');

  if (cb && typeof cb == 'function') { // Выполняем переданный колбэк
    cb(map);
  }
};

const drawPoints = (map: OlMap, markers: IPoint[]): void => { // Функция рисования точек на карте
  const features = markers.map((point: IPoint) => {
    return new Feature({
      geometry: new Point(fromLonLat([point.lon, point.lat])),
    });
  });

  const vector = new Vector({
    features,
  });

  const layer = new VectorImage({
    source: vector,
  });

  map.addLayer(layer);
};

export const Map: React.FC<IMapProps> = ({ markers, center, caption }) => {
  const isFirstRun = useRef(true);

  useEffect(() => { // Инициализируем карту в самый первый рендер компонента
    initMap(map, () => {
      console.log('Карта создана...', caption);

      const measureArea = new MeasureArea(map); // Инструмент для измерения площади
      measureArea.addInteraction();
    });
  }, []);

  useEffect(() => { // Рисуем точки на карте, если замечено изменение стейта
    drawPoints(map, markers);
  }, [markers]);

  useEffect(() => {
    if (isFirstRun.current === true) {
      isFirstRun.current = false;
    } else {
      setTimeout(() => {
        view.animate({ center: fromLonLat(center) });
        view.animate({ zoom: 15 });
      }, 800);
    }

    return () => { // Вызывается при анмаунте, анмаунт происходит всегда перед новым маунтом
      view.animate({ zoom: 5 });
    };
  }, [center]);

  return <div className="map js-map" id="js-map"></div>;
};

const mapStateToProps = (state: IRootReducer): IMapProps => { // Берём из стейта то, что нам нужно и отдаём в компонент
  return {
    markers: state.markers.markersData,
    center: state.center.coords,
    caption: '',
  };
};

export default connect(mapStateToProps)(Map); // соединяем стейт и компонент

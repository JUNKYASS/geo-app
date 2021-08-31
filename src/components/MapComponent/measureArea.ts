import * as ol from 'ol';
import { EventsKey } from 'ol/events';
import { Geometry } from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import { OnReturn, unByKey } from 'ol/Observable';
import VectorSource from 'ol/source/Vector';
import { getArea } from 'ol/sphere';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import '../../style/measurearea.scss';

class MeasureArea {
  sketch: ol.Feature<Geometry> | null; // Currently drawn feature.
  helpTooltipElement: HTMLElement | null; // The help tooltip element.
  helpTooltip: ol.Overlay | null; // Overlay to show the help messages.
  measureTooltipElement: HTMLElement | null; // The measure tooltip element.
  measureTooltip: ol.Overlay | null; // Overlay to show the measurement.
  vectorSource: VectorSource<Geometry>; // Векторный источник
  draw: any;
  map: ol.Map; // Карта
  mapListener: EventsKey | EventsKey[] | undefined;  

  constructor(map: ol.Map) {
    this.sketch = null;
    this.helpTooltipElement = null;
    this.helpTooltip = null;
    this.measureTooltipElement = null;
    this.measureTooltip = null;
    this.vectorSource = new VectorSource();
    this.draw = null;
    this.map = map;
  }

  private addNewLayer(): void {
    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });

    this.map.addLayer(vectorLayer);
  }

  private createHelpTooltip(): void { // Creates a new help tooltip
    if (this.helpTooltipElement) this.helpTooltipElement.parentNode?.removeChild(this.helpTooltipElement);

    this.helpTooltipElement = document.createElement('div');
    this.helpTooltipElement.className = 'ol-tooltip hidden';

    this.helpTooltip = new ol.Overlay({
      element: this.helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left',
    });

    this.map.addOverlay(this.helpTooltip);
  }

  private createMeasureTooltip(): void { // Creates a new measure tooltip
    if (this.measureTooltipElement) this.measureTooltipElement.parentNode?.removeChild(this.measureTooltipElement);

    this.measureTooltipElement = document.createElement('div');
    this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';

    this.measureTooltip = new ol.Overlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
      stopEvent: false,
      insertFirst: false,
    });

    this.map.addOverlay(this.measureTooltip);
  }

  private formatArea(polygon: Geometry): string { // Format area output.
    const area = getArea(polygon);
    let output;

    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
      output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
    }

    return output;
  }

  private bind(): void {
    let listener: OnReturn;

    this.addNewLayer();

    this.mapListener = this.map.on('pointermove', (evt) => {
      if (evt.dragging) return;

      this.helpTooltipElement!.innerHTML = this.sketch ? 'Click to continue drawing the polygon' : 'Click to start drawing'; // Message to show when the user is drawing a polygon
      this.helpTooltip?.setPosition(evt.coordinate);

      this.helpTooltipElement!.classList.remove('hidden');
    });

    this.map.getViewport().addEventListener('mouseout', () => {
      this.helpTooltipElement!.classList.add('hidden');
    });

    this.draw.on('drawstart',  (evt: { feature: ol.Feature<Geometry>; coordinate: number[]; }) => {
      this.sketch = evt.feature; // set sketch
      let tooltipCoord = evt.coordinate;
  
      listener = this.sketch?.getGeometry().on('change', (evt: any) => {
        const geom = evt.target;
  
        const output = this.formatArea(geom);
        tooltipCoord = geom.getInteriorPoint().getCoordinates();
  
        this.measureTooltipElement!.innerHTML = output;
        this.measureTooltip?.setPosition(tooltipCoord);
      });
    });
  
    this.draw.on('drawend', () => {
      this.measureTooltipElement!.className = 'ol-tooltip ol-tooltip-static';
      this.measureTooltip?.setOffset([0, -7]);
      this.sketch = null; // unset sketch
      this.measureTooltipElement = null; // unset tooltip so that a new one can be created
      this.createMeasureTooltip();
      unByKey(listener);

      this.deactivate();
    });
  }

  public addInteraction(): void {
    this.draw = new Draw({
      source: this.vectorSource,
      type: 'Polygon',
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2,
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
        }),
      }),
    });
  
    this.map.addInteraction(this.draw);
  
    this.createMeasureTooltip();
    this.createHelpTooltip();
  
    this.bind();
  }

  public deactivate(): void {
    this.map.removeInteraction(this.draw);
    if(this.mapListener) unByKey(this.mapListener);
  }
}

export {
  MeasureArea
};

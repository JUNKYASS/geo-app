import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Map } from '../components/MapComponent';
import '../style/map.stories.scss';

export default {
    title: 'Default Map',
    component:  Map,
} as ComponentMeta<typeof Map>;

const markersData = [
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
];

const Template: ComponentStory<typeof Map> = (args) => <Map {...args} />;

export const MoscowCenter = Template.bind({});
MoscowCenter.args = {
  markers: markersData,
  center: [37.6204, 55.7475],
  caption: 'hello buddy',
};

export const SpbCenter = Template.bind({});
SpbCenter.args = {
  markers: markersData,
  center: [30.315868, 59.939098],
  caption: 'second time',
};

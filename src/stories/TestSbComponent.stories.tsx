import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TestSb } from '../components/TestSbComponent';

import '../style/testsb.scss';

export default {
  title: 'input (sb test)',
  component: TestSb
} as ComponentMeta<typeof TestSb>;

export const ExampleTestSb: ComponentStory<typeof TestSb> = () => {
  return <TestSb />;
};

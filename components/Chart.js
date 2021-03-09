import PropTypes from 'prop-types';
import React from 'react';
import {
  VictoryCandlestick,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import { View } from 'react-native';

const CandleStickChart = ({ordered_data}) => {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={{ x: 25 }}
      scale={{ x: 'time' }}
    >
      <VictoryAxis tickFormat={(t) => `${t.toString().slice(4, 9)}`} />
      <VictoryAxis dependentAxis />
      <VictoryCandlestick
        candleColors={{ positive: '#336d16', negative: '#ff0000' }}
        data={ordered_data}
      />
    </VictoryChart>
  );
};

CandleStickChart .propTypes = {};

export default CandleStickChart ;

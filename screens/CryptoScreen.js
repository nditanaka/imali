import * as React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { Text, View } from '../components/Themed';
import {
  VictoryCandlestick,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';

// const data = [
//   { quarter: 1, earnings: 13000 },
//   { quarter: 2, earnings: 16500 },
//   { quarter: 3, earnings: 14250 },
//   { quarter: 4, earnings: 19000 },
// ];

export default class CryptoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta_data: '',
      data: '',
      loading: false,
      ordered_data: '',
      object_data: '',
    };
  }
  componentDidMount() {
    fetch(
      'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&apikey=ONRJFIE2FKEETJN9',
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((JSON) =>
        this.setState({
          meta_data: JSON['Meta Data'],
          data: JSON['Time Series (Daily)'],
          loading: false,
        })
      )
      .then((response) =>
        this.setState({
          ordered_data: this.reshapedata(),
        })
      )
      .catch((err) => {
        console.error(err);
      });
  }
  reshapedata() {
    let data_list = this.state.data;
    let data_rearranged_h = [];
    for (let key in data_list) {
      let item_list = {
        open: parseFloat(data_list[key]['1. open']),
        close: parseFloat(data_list[key]['4. close']),
        high: parseFloat(data_list[key]['2. high']),
        low: parseFloat(data_list[key]['3. low']),
        x: key,
      };
      data_rearranged_h.push(item_list);
    }
    return data_rearranged_h;
  }
  render() {
    console.log(this.state.ordered_data);
    return (
      <View style={styles.container}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 25 }}
          scale={{ x: 'time' }}
        >
          <VictoryAxis tickFormat={(t) => `${t.toString().slice(4, 9)}`} />
          <VictoryAxis dependentAxis />
          <VictoryCandlestick
            candleColors={{ positive: '#336d16', negative: '#ff0000' }}
            data={this.state.ordered_data}
          />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});

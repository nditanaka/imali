import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';

import {
  VictoryCandlestick,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import { Card } from 'react-native-elements';

export default class StocksScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      searchText: '',
      isSearch: true,
      currentTicker: '',
      metadata: '',
      name: '',
      description: '',
      symbol: '',
      marketcap: '',
      industry: '',
      sector: '',
      last_refresh: '',
      maData: '',
      data: '',
      ordered_data: '',
      object_data: '',
      displayCards: false,
    };
    this.getMetadata = this.getMetadata.bind(this);
    // this.getMA = this.getMA.bind(this);
    this.getOHLCData = this.getOHLCData.bind(this);
  }

  // API calls to stock market data
  getMetadata = async () => {
    let stockSymbol = this.state.currentTicker;
    // API URL
    let stockURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${process.env.REACT_APP_API_KEY}`;

    fetch(stockURL)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ metadata: responseJson });
        this.setState({ isLoading: false });
        this.setState({ description: responseJson['Description'] });
        this.setState({ symbol: responseJson['Symbol'] });
        this.setState({ marketcap: responseJson['MarketCapitalization'] });
        this.setState({ industry: responseJson['Industry'] });
        this.setState({ sector: responseJson['Sector'] });
        this.setState({ displayCards: true });
      })
      .catch((error) => {
        console.log(error);
      });
    // if ((this.state.ordered_data = null)) {
    // this.getOHLCData();
    // }
  };

  getOHLCData = async () => {
    let stockSymbol = this.state.currentTicker;
    // API URL
    let stockURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&apikey=${process.env.REACT_APP_API_KEY}`;
    fetch(stockURL, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((JSON) =>
        this.setState({
          data: JSON['Time Series (Daily)'],
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
    // console.log('OHLC URL', stockURL);
    // if ((this.state.metadata = null)) {
    // this.getMetadata();
    // }
  };

  async getMA() {
    let stockSymbol = this.state.currentTicker;
    // API URL
    let MA_URL = `https://www.alphavantage.co/query?function=EMA&symbol=${stockSymbol}&interval=weekly&time_period=10&series_type=open&apikey=${process.env.REACT_APP_API_KEY}`;
    fetch(MA_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ last_refresh: responseJson['3: Last Refreshed'] });
        this.setState({ isLoading: false });
        this.setState({ maData: responseJson['Technical Analysis: EMA'] });
        // console.log(responseJson['Technical Analysis: EMA']);
        // console.log('Ticker in state is: ', this.state.currentTicker);
        // console.log('name: ', this.state.name);
        // console.log(this.state.metadata);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getRSI() {
    let stockSymbol = this.state.currentTicker;
    // API URL
    let MA_URL = `https://www.alphavantage.co/query?function=EMA&symbol=${stockSymbol}&interval=weekly&time_period=10&series_type=open&apikey=${process.env.REACT_APP_API_KEY}`;
    fetch(MA_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ last_refresh: responseJson['3: Last Refreshed'] });
        this.setState({ isLoading: false });
        this.setState({ maData: responseJson['Technical Analysis: EMA'] });
        // console.log('Ticker in state is: ', this.state.currentTicker);
        // console.log('name: ', this.state.name);
        // console.log(this.state.metadata);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async componentDidMount() {
    if (this.state.currentTicker) {
      this.getMetadata();
      // this.getMA();
      this.getOHLCData();
      this.setState({ isLoading: false });
    }
  }

  renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => this.onclickOnRow(item)}>
      <View>
        <Text style={{ color: '#6c7ce4', fontWeight: 'bold', fontSize: 26 }}>
          {item.name}
        </Text>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Ticker: {item.symbol}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
  onclickOnRow(item) {
    const indexOfitem = this.state.searchText.indexOf(item);
    const tempSearchText = this.state.searchText.slice(
      indexOfitem,
      indexOfitem + 3
    );
    this.setState({ currentTicker: item.symbol });
    this.setState({ searchText: tempSearchText });
    // console.log(this.state.searchText);
    this.getMetadata();
    this.getMA();
    this.getOHLCData();
    this.setState({ isLoading: true });
    console.log('currentTicker in state: ', this.state.currentTicker);
    console.log('Selected Item :', item);
    console.log('name in state', this.state.name);
    console.log(this.state.ordered_data);
  }

  searchStockTickers = async (value) => {
    const URL = `https://ticker-2e1ica8b9.now.sh//keyword/${value}/`;
    // console.log(URL);
    if (value) {
      fetch(URL)
        .then((response) => response.json())
        .then((response) => {
          this.setState({ searchText: response });
          this.setState({ name: response['name'] });
          this.setState({ loading: false });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ isSearch: false });
    }
  };
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
    // console.log(this.state.ordered_data);
    // console.log('search text array', this.state.searchText);
    return (
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: '#2f363c' }} />
        <TextInput
          placeholder='Search 🔍 for stocks'
          placeholderTextColor='#dddddd'
          style={{
            backgroundColor: '#2f363c',
            height: 50,
            fontSize: 36,
            padding: 10,
            color: 'white',
            borderBottomWidth: 0.5,
            borderBottomColor: '#2f363c',
          }}
          onChangeText={(value) => this.searchStockTickers(value)}
        />
        <View style={{ flex: 1, backgroundColor: '#2f363c' }}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'center',
                justifyContent: 'top',
              }}
            >
              <ActivityIndicator size='small' color='#8086FB' />
            </View>
          ) : null}
          <FlatList
            data={this.state.searchText}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
              >
                {this.state.isSearch ? (
                  <View
                    style={{
                      ...StyleSheet.absoluteFill,
                      alignItems: 'center',
                      justifyContent: 'top',
                    }}
                  >
                    <Text style={{ color: '#6c7ce4' }}>
                      Enter ticker or company name
                    </Text>
                  </View>
                ) : (
                  <Text>{this.state.isSearch}</Text>
                )}
              </View>
            )}
          />
        </View>
        <ScrollView>
          <View style={styles.container}>
            <Text h3 style={{ alignSelf: 'center', padding: 5 }}>
              {this.state.name}
            </Text>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 25 }}
              scale={{ x: 'time' }}
            >
              <VictoryAxis
                tickValues={[5, 6, 7, 8, 9, 10, 11, 12]}
                // tickFormat={(t) => `${t}`}
                tickFormat={(t) => console.log(t)}
              />
              <VictoryAxis
                dependentAxis
                axisLabelComponent={<VictoryLabel dx={20} />}
              />
              <VictoryCandlestick
                candleColors={{ positive: '#336d16', negative: '#ff0000' }}
                data={this.state.ordered_data}
              />
            </VictoryChart>
            {this.state.displayCards == true ? (
              <View style={styles.container}>
                <Card key={this.state.currentTicker}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text h4 style={{ alignSelf: 'auto', padding: 5 }}>
                      {this.state.symbol}{' '}
                      {'$' +
                        parseInt(this.state.marketcap)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                      {' Market capitalization'}
                    </Text>
                  </View>
                </Card>
                <Card>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text h4 style={{ alignSelf: 'auto', padding: 1 }}>
                      {('Sector ', (this.state.sector, ' '))}
                    </Text>
                    <Text h4 style={{ alignSelf: 'auto', padding: 1 }}>
                      {('Industry ', this.state.industry)}
                    </Text>
                  </View>
                  <View style={{ paddingTop: 5 }}>
                    <Text style={{ fontSize: 16 }}>
                      {this.state.description}
                    </Text>
                  </View>
                </Card>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'powderblue',
    padding: 8,
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '300',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'steelblue',
    borderRadius: 12,
    padding: 5,
    width: 200,
  },
});

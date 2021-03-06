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
  Dimensions,
  ImageBackground,
  Pressable,
} from 'react-native';
import Constants from 'expo-constants';
import { Image } from 'react-native-elements';
// import yahooFinance from 'yahoo-finance2';

import {
  VictoryCandlestick,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import { Card } from 'react-native-elements';
import StocksHomepage from '../components/StocksHomepage';

export default class CryptoScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      searchText: '',
      isSearch: true,
      currentTicker: '',
      metadata: '',
      name: '',
      companyicon: '',
      companynamedomainlogo: '',
      logo: undefined,
      displayCharts: false,
      domain: '',
      companyname_forlogo: '',
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
    this.getOHLCData = this.getOHLCData.bind(this);
    this.getLogo = this.getLogo.bind(this);
    this.refreshstocks = this.refreshstocks.bind(this);
    this.getMA = this.getMA.bind(this);
    this.pad = this.pad.bind(this);
    // this.getCurrentprice = this.getCurrentprice.bind(this);
    // this.getQuote = this.getQuote(this);
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

  pad(n) {
    return n < 10 ? '0' + n : n;
  }

  async getMA() {
    let stockSymbol = this.state.currentTicker;
    // API URL
    let MA_URL = `https://www.alphavantage.co/query?function=EMA&symbol=${stockSymbol}&interval=weekly&time_period=10&series_type=open&apikey=${process.env.REACT_APP_API_KEY}`;
    let today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    let currentdate =
      yesterday.getFullYear() +
      '-' +
      this.pad(yesterday.getMonth() + 1) +
      '-' +
      this.pad(yesterday.getDate());

    fetch(MA_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ last_refresh: responseJson['3: Last Refreshed'] });
        this.setState({ isLoading: false });
        this.setState({ maData: responseJson['Technical Analysis: EMA'] });
        console.log(
          responseJson['Technical Analysis: EMA'][currentdate]['EMA']
        );
        // console.log('Ticker in state is: ', this.state.currentTicker);
        // console.log('name: ', this.state.name);
        // console.log('maData', this.state.maData);
        console.log(currentdate);
        // console.log(this.state.metadata);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // async getQuote() {
  //   let stockSymbol = this.state.currentTicker;
  //   const results = await yahooFinance.search(stockSymbol);
  //   console.log(results);
  //   this.setState({ quoteData: results });
  // }

  async getRSI() {
    let stockSymbol = this.state.currentTicker;
    // API URL
    let MA_URL = `https://www.alphavantage.co/query?function=EMA&symbol=${stockSymbol}&interval=weekly&time_period=10&series_type=open&apikey=${process.env.REACT_APP_API_KEY}`;
    let RSI_URL = `https://www.alphavantage.co/query?function=RSI&symbol=${stockSymbol}&interval=weekly&time_period=10&series_type=open&apikey=${process.env.REACT_APP_API_KEY}`;
    fetch(RSI_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ last_refresh: responseJson['3: Last Refreshed'] });
        this.setState({ isLoading: false });
        this.setState({ maData: responseJson['Technical Analysis: EMA'] });
        // console.log('Ticker in state is: ', this.state.currentTicker);
        // console.log(responseJson);
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
      this.getMA();
      this.getOHLCData();
      this.refreshstocks();
      this.setState({ isLoading: false });
      this.setState({ logo: String(this.state.companynamedomainlogo['logo']) });
    }
  }
  refreshstocks() {
    if (ordered_data) {
      setState({ displayCharts: true });
    }
  }

  renderItem = ({ item }) => (
    <Pressable onPress={() => this.onclickOnRow(item)}>
      <View>
        <Text style={{ color: '#6c7ce4', fontWeight: 'bold', fontSize: 26 }}>
          {item.name}
        </Text>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Ticker: {item.symbol}
        </Text>
      </View>
    </Pressable>
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
    this.getLogo(this.truncate(item.name));
    // this.getQuote();
    this.setState({ isLoading: true });
    // this.getCurrentprice();
    // console.log('currentTicker in state: ', this.state.currentTicker);
    // console.log('Selected Item :', item);
    // console.log('name in state', this.state.name);
    // console.log(this.state.ordered_data);
    // console.log(this.state.companyicon);
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
          this.setState({ displayCharts: true });
          this.setState({ loading: false });
          // console.log(truncate(response['name']));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ isSearch: false });
      this.setState({ displayCards: false });
    }
  };

  getLogo = async (companyname) => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Basic c2tfNmRlNmU1NDMxN2M5NzkzZmFkYmRkMWUwM2Q2OGVkZTA6'
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    url = `https://company.clearbit.com/v1/domains/find?name=${companyname}`;

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ companynamedomainlogo: result }),
          this.setState({ logo: result.logo }),
          this.setState({ domain: result['domain'] });
      })
      .catch((error) => console.log('error', error));
    console.log(url);
  };

  truncate = (elem) => {
    // Make sure an element and number of items to truncate is provided
    if (!elem) return;

    // Get the inner content of the element
    var content = elem.trim();

    // Convert the content into an array of words
    // Remove any words above the limit
    if (content.includes('Inc.' || 'Inc')) {
      // content = content.split(' ').slice(0, 2);
      var shortened = content.replace('Inc.', '');
      var shortened = content.replace('Inc', '');
      return shortened;
    }
    // if (this.wordCount(content) >= 2) {
    //   content.substr();
    // }
  };

  // wordCount = (fullcompanyname) => {
  //   var lettercount = fullcompanyname.match(/[^\s]+/g);
  //   return lettercount ? lettercount.length : 0;
  // }

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
  // async getCurrentprice() {
  //   const price = await yahooStockPrices.getCurrentPrice('AAPL');
  //   console.log('price: ', price);
  // }
  // results = await yahooFinance.search('AAPL');

  render() {
    // console.log(this.state.ordered_data);
    // console.log('search text array', this.state.searchText);
    // console.log('company ', this.state.companynamedomainlogo);
    // console.log('logo', this.state.logo);
    // console.log('domain', this.state.domain);
    // console.log('domain:', this.state.domain);
    // console.log(this.results);
    return (
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: '#2f363c' }} />
        <TextInput
          placeholder='Search 🔍 for crypto'
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
          <SafeAreaView style={{ flex: 1 }}>
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
          </SafeAreaView>
        </View>
        <ScrollView>
          {this.state.displayCharts == true ? (
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
                  // tickValues={[5, 6, 7, 8, 9, 10, 11, 12]}
                  // domain={{x: [0, 100]}}
                  scale='time'
                  // tickFormat={(t) => `${t}`}
                  // tickFormat={(t) => `${t.slice(0, 2)}`}
                  tickFormat={(t) => new Date(t).getFullYear()}
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
              <View style={styles.container}>
                <Card key={this.state.currentTicker}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image
                      style={styles.logo}
                      source={{
                        uri: this.state.companynamedomainlogo['logo'],
                      }}
                      PlaceholderContent={<ActivityIndicator />}
                    />
                    <Text h4 style={{ alignSelf: 'auto', padding: 5 }}>
                      {this.results}
                      {this.state.companynamedomainlogo['name']}{' '}
                      {this.state.symbol} {' Market cap'}{' '}
                      {'$' +
                        parseInt(this.state.marketcap)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </Text>
                  </View>
                </Card>
                <Card>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text h4 style={{ alignSelf: 'auto', padding: 1 }}>
                      {(this.state.sector, ' ')} {(this.state.domain, ' ')}{' '}
                    </Text>
                    <Text h4 style={{ alignSelf: 'auto', padding: 1 }}>
                      {this.state.industry}
                    </Text>
                  </View>
                  <View style={{ paddingTop: 5 }}>
                    <Text style={{ fontSize: 16 }}>
                      {this.state.description}
                    </Text>
                  </View>
                </Card>
              </View>
              {this.state.displayCards == true ? (
                <View style={styles.container}>
                  <Card key={this.state.currentTicker}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Image
                        style={styles.logo}
                        source={{
                          uri: this.state.companynamedomainlogo['logo'],
                        }}
                        PlaceholderContent={<ActivityIndicator />}
                      />
                      <Text h4 style={{ alignSelf: 'auto', padding: 5 }}>
                        {this.state.companynamedomainlogo['name']}{' '}
                        {this.state.symbol} {' Market cap'}{' '}
                        {'$' +
                          parseInt(this.state.marketcap)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                      </Text>
                    </View>
                  </Card>
                  <Card>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text h4 style={{ alignSelf: 'auto', padding: 1 }}>
                        {(this.state.sector, ' ')} {(this.state.domain, ' ')}{' '}
                      </Text>
                      <Text h4 style={{ alignSelf: 'auto', padding: 1 }}>
                        {this.state.industry}
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
          ) : (
            <StocksHomepage style={styles.background} />
          )}
        </ScrollView>
      </ScrollView>
    );
  }
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'powderblue',
    padding: 8,
  },
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    height: SCREEN_WIDTH * 0.15,
    width: SCREEN_WIDTH * 0.15,
    marginLeft: SCREEN_WIDTH * 0.05,
  },
});

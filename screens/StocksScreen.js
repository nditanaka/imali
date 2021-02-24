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
// import { getMA } from '../helpers/helper';

export default class StocksScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      searchText: '',
      isSearch: false,
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
    };
    this.getMetadata = this.getMetadata.bind(this);
    this.getMA = this.getMA.bind(this);
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
        this.setState({ name: responseJson['Name'] });
        this.setState({ description: responseJson['Description'] });
        this.setState({ symbol: responseJson['Symbol'] });
        this.setState({ marketcap: responseJson['MarketCapitalization'] });
        this.setState({ industry: responseJson['Industry'] });
        this.setState({ sector: responseJson['Sector'] });
        // console.log('Alpha API call to ', this.stockURL);
        // console.log('Ticker in state is: ', this.state.currentTicker);
        // console.log('name: ', this.state.name);
        // console.log(this.state.metadata);
      })
      .catch((error) => {
        console.log(error);
      });
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
        console.log(responseJson['Technical Analysis: EMA']);
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
        console.log(responseJson['Technical Analysis: EMA']);
        // console.log('Ticker in state is: ', this.state.currentTicker);
        // console.log('name: ', this.state.name);
        // console.log(this.state.metadata);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    if (this.state.currentTicker) {
      this.getMetadata();
      this.getMA();
      this.setState({ isLoading: false });
    }
  }

  renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => this.onclickOnRow(item)}>
      <View>
        <Text style={{ color: '#bada55', fontWeight: 'bold', fontSize: 26 }}>
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
    // console.log('Selected Item :', item);
    this.setState({ currentTicker: item.symbol });
    this.setState({ searchText: tempSearchText });
    // console.log(this.state.searchText);
    // console.log('currentTicker in state: ', this.state.currentTicker);
    this.getMetadata();
    this.getMA();
    this.setState({ isLoading: false });
  }

  searchStockTickers = async (value) => {
    const URL = `https://ticker-2e1ica8b9.now.sh//keyword/${value}/`;
    // console.log(URL);
    if (value) {
      fetch(URL)
        .then((response) => response.json())
        .then((response) => {
          this.setState({ searchText: response });
          this.setState({ loading: false });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ isSearch: false });
    }
  };
  render() {
    console.log('search text array', this.state.searchText);
    return (
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: '#2f363c' }} />
        <TextInput
          placeholder='Search for stocks'
          placeholderTextColor='#dddddd'
          style={{
            backgroundColor: '#2f363c',
            height: 50,
            fontSize: 36,
            padding: 10,
            color: 'white',
            borderBottomWidth: 0.5,
            borderBottomColor: '#7d90a0',
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
              <ActivityIndicator size='small' color='#bad555' />
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
                <Text style={{ color: '#bad555' }}>
                  Enter ticker or company name
                </Text>
              </View>
            )}
          />
        </View>
        <ScrollView>
          <View style={styles.container}>
            <Text styles={styles.text}>{this.state.name}</Text>
            <Text styles={styles.text}>sector: {this.state.sector}</Text>
            <Text styles={styles.text}>industry: {this.state.industry}</Text>
            <Text styles={styles.text}>stock_symbol: {this.state.symbol}</Text>
            <Text styles={styles.text}>
              Market Cap: {this.state.marketcap}{' '}
            </Text>
            <Text styles={styles.text}>
              'MA last check: '{this.state.last_refresh}
            </Text>
            <Text styles={styles.text}>{this.state.description}</Text>
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
    // Text styles
    fontFamily: 'Helvetica',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '300',
    textAlign: 'center',
    color: 'white',
    // View styles
    backgroundColor: 'steelblue',
    borderRadius: 12,
    padding: 20,
    width: 200,
  },
});

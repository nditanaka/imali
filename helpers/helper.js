export function HelloChandu() {}

export function HelloTester() {}


export defaultgetMetadata = async () => {
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
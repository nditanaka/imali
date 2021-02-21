import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Forex: {
            screens: {
              ForexScreen: 'two',
            },
          },
          Stocks: {
            screens: {
              StocksScreen: 'one',
            },
          },
          Crypto: {
            screens: {
              CryptoScreen: 'three',
            },
          },
          Resources: {
            screens: {
              ResourcesScreen: 'four',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

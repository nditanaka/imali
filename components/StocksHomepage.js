import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';

const StocksHomepage = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <ImageBackground
        source={require('../assets/background.png')}
        style={styles.background}
      > */}
      <View>
        <Image
          source={require('../assets/onboarding-img1.png')}
          style={styles.logo}
          resizeMode='contain'
        />
        <Text style={styles.text}>Find new stocks.</Text>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

export default StocksHomepage;

const styles = StyleSheet.create({
  background: {
    width: 400,
    height: 600,
    // background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
  },
  logo: {
    width: 280,
    height: 280,
    marginLeft: '15%',
    marginTop: '-5%',
    marginBottom: '10%',
  },
  text: {
    color: '#a18cd1',
    marginTop: '-10%',
    marginLeft: '20%',
  },
});

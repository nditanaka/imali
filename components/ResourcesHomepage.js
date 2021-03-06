import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';

const ResourcesHomepage = () => {
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
        <Text style={styles.text}>Travel with people. Make new friends.</Text>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

export default ResourcesHomepage;

const styles = StyleSheet.create({
  background: {
    width: 400,
    height: 600,
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

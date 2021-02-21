import * as React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { Text, View } from '../components/Themed';

export default function CryptoScreen() {
  return (
    <ScrollView>
      <Text> Crypto Screen </Text>
      <Text>{process.env.REACT_APP_API_KEY}</Text>
    </ScrollView>
  );
}

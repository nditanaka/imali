// import * as React from 'react';
import { StyleSheet } from 'react-native';
// import SearchBar from 'react-native-dynamic-search-bar';
import { Text, View } from '../components/Themed';
import React, { Component } from 'react';
import {
  // View,
  // Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
// import { List, ListItem, SearchBar } from "react-native-elements";
import ResourcesHomepage from '../components/ResourcesHomepage';

export default function ResourcesScreen() {
  return <ResourcesHomepage />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  search: {
    position: 'absolute',
    zIndex: 1,
    elevation: 1,
    height: 40,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 5,
  },
});

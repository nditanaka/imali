import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ForexScreen from '../screens/ForexScreen';
import StocksScreen from '../screens/StocksScreen';
import CryptoScreen from '../screens/CryptoScreen';
import ResourcesScreen from '../screens/ResourcesScreen';

import { BottomTabParamList, ForexParamList, StocksParamList, CryptoParamList, ResourcesParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Stocks"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Stocks"
        component={StocksNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="stats-chart" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Forex"
        component={ForexNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Crypto"
        component={CryptoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="logo-bitcoin" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Resources"
        component={ResourcesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-book" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ForexStack = createStackNavigator<ForexParamList>();

function ForexNavigator() {
  return (
    <ForexStack.Navigator>
      <ForexStack.Screen
        name="ForexScreen"
        component={ForexScreen}
        options={{ headerTitle: 'Forex' }}
      />
    </ForexStack.Navigator>
  );
}

const StocksStack = createStackNavigator<StocksParamList>();

function StocksNavigator() {
  return (
    <StocksStack.Navigator>
      <StocksStack.Screen
        name="StocksScreen"
        component={StocksScreen}
        options={{ headerTitle: 'Stocks' }}
      />
    </StocksStack.Navigator>
  );
}

const CryptoStack = createStackNavigator<CryptoParamList>();

function CryptoNavigator() {
  return (
    <CryptoStack.Navigator>
      <CryptoStack.Screen
        name="CryptoScreen"
        component={CryptoScreen}
        options={{ headerTitle: 'Crypto' }}
      />
    </CryptoStack.Navigator>
  );
}

const ResourcesStack = createStackNavigator<ResourcesParamList>();

function ResourcesNavigator() {
  return (
    <ResourcesStack.Navigator>
      <ResourcesStack.Screen
        name="ResourcesScreen"
        component={ResourcesScreen}
        options={{ headerTitle: 'Resources' }}
      />
    </ResourcesStack.Navigator>
  );
}

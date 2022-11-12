import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@screens/Home';
import NewTripScreen from '@screens/NewTrip';
import {paperTheme} from '@configs/theme.config';
import TripDetailScreen from '@screens/TripDetail';

export type RootStackParamList = {
  Main: undefined;
  NewTrip:
    | undefined
    | {
        mode: 'edit' | 'create';
        tripId: string;
      };
  TripDetail: {
    tripId: number;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const commonHeaderStyles: any = {
  headerStyle: {
    backgroundColor: paperTheme.colors.primary,
  },
  headerTintColor: paperTheme.colors.background,
  headerTitleStyle: {
    fontWeight: '500',
  },
};

export const MainStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewTrip"
        options={{
          title: 'New Trip',
          ...commonHeaderStyles,
        }}
        component={NewTripScreen}
      />
      <Stack.Screen
        name="TripDetail"
        options={{
          ...commonHeaderStyles,
        }}
        component={TripDetailScreen}
      />
    </Stack.Navigator>
  );
};

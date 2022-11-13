import React from 'react';
import MapView from 'react-native-maps';

export const TripMap = () => {
  return (
    <MapView
      style={{
        height: 100,
      }}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};

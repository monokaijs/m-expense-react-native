import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import {getSize} from '@utils/ui.utils';

interface TripMapProps {
  dataLocation?: string;
}

export const TripMap = ({dataLocation}: TripMapProps) => {
  const [location, setLocation] = useState({
    lat: 37.78825,
    lng: -122.4324,
  });
  useEffect(() => {
    if (dataLocation) {
      const locationJSON = JSON.parse(dataLocation);
      console.log(locationJSON);
      console.log(locationJSON.location);
      setLocation(locationJSON.location);
    }
  }, [dataLocation]);
  return (
    <View style={styles.outer}>
      <MapView
        style={{
          height: 200,
        }}
        region={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lng,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    borderRadius: getSize.m(16),
    overflow: 'hidden',
  },
});

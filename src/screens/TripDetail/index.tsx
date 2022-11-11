import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {StatusBarAware} from '@components/layout/StatusBarAware';

const TripDetailScreen = () => {
  const {params} = useRoute();
  useEffect(() => {
    console.log(params);
  }, [params]);
  return (
    <>
      <StatusBarAware />
      <View />
    </>
  );
};

export default TripDetailScreen;

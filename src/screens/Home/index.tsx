import React, {useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {HomeHeader} from '@screens/Home/HomeHeader';
import {FAB, useTheme} from 'react-native-paper';
import {paperTheme} from '@configs/theme.config';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@redux/store';
import StyledText from '@components/common/Text';
import {getSize} from '@utils/ui.utils';
import moment from 'moment';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {trips} = useAppSelector(state => state.app);

  return (
    <View style={styles.outer}>
      <HomeHeader />
      <FlatList
        data={trips}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={styles.item}
            onPress={() => {
              console.log(item);
              if (item.id) {
                navigation.navigate('TripDetail', {
                  tripId: item.id,
                });
              }
            }}>
            <View style={styles.tripMeta}>
              <StyledText style={styles.tripName}>{item.name}</StyledText>
              <StyledText style={styles.tripLocation}>
                {item.destination}
              </StyledText>
            </View>
            <View style={styles.tripDateSection}>
              <StyledText style={styles.tripDate}>
                {moment(item.date).format('MMM DD')}
              </StyledText>
              <StyledText style={styles.tripYear}>
                {moment(item.date).format('YYYY')}
              </StyledText>
            </View>
          </TouchableOpacity>
        )}
      />
      <FAB
        icon="plus"
        color={colors.background}
        style={styles.fab}
        onPress={() => navigation.navigate('NewTrip')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: getSize.m(16),
    right: 0,
    bottom: 0,
    backgroundColor: paperTheme.colors.primary,
  },
  item: {
    backgroundColor: '#ffffff11',
    marginHorizontal: getSize.m(16),
    marginTop: getSize.m(16),
    padding: getSize.m(16),
    paddingRight: 0,
    borderRadius: getSize.m(8),
    flexDirection: 'row',
  },
  tripMeta: {
    flex: 1,
  },
  tripDateSection: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getSize.m(80),
    borderLeftWidth: 1,
    borderLeftColor: '#ffffff33',
  },
  tripDate: {
    color: 'white',
    fontSize: getSize.m(16),
    fontWeight: '600',
  },
  tripYear: {
    fontSize: getSize.m(12),
    fontWeight: '600',
    color: '#ffffff33',
  },
  tripName: {
    color: 'white',
    fontSize: getSize.m(16),
    fontWeight: '500',
  },
  tripLocation: {
    color: paperTheme.colors.primary,
    textTransform: 'uppercase',
    fontSize: getSize.m(12),
    fontWeight: '400',
  },
});

export default HomeScreen;

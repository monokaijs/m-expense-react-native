import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {StatusBarAware} from '@components/layout/StatusBarAware';
import {StorageService} from '@services/StorageService';
import StyledText from '@components/common/Text';
import {getSize} from '@utils/ui.utils';
import {Button, Card} from 'react-native-paper';
import {paperTheme} from '@configs/theme.config';
import {SectionTitle} from '@components/common/SectionTitle';
import Icon from 'react-native-vector-icons/Ionicons';

const TripDetailScreen = () => {
  const {params} = useRoute();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const {tripId} = params as any;
    StorageService.getTrip(tripId).then(data => {
      setTrip(data);
    });
  }, [params]);
  return (
    <>
      <StatusBarAware />
      {trip && (
        <FlatList
          ListHeaderComponent={
            <View style={styles.outer}>
              <View style={styles.header}>
                <StyledText style={styles.title}>{trip.name}</StyledText>
                <View style={styles.controls}>
                  <Button icon={'pencil'} mode={'contained'}>
                    Edit
                  </Button>
                  <Button
                    style={styles.deleteBtn}
                    icon={'delete'}
                    mode={'contained'}
                    buttonColor={paperTheme.colors.danger}
                    textColor={'white'}>
                    Edit
                  </Button>
                </View>
              </View>
              <View style={styles.section}>
                <SectionTitle>DETAILS</SectionTitle>
                <StyledText style={styles.detailText}>
                  <Icon name={'location'} size={getSize.m(14)} /> Location:{' '}
                  {trip.destination}
                </StyledText>
                <StyledText style={styles.detailText}>
                  <Icon name={'card'} size={getSize.m(14)} /> Budget: $
                  {trip.budget}
                </StyledText>
              </View>
              <View style={styles.section}>
                <SectionTitle>DESCRIPTION</SectionTitle>
                <Card style={styles.descriptionCard}>
                  <StyledText style={styles.descriptionText}>
                    {trip.description}
                  </StyledText>
                </Card>
              </View>
              <View style={styles.section}>
                <SectionTitle>EXPENSES</SectionTitle>
              </View>
            </View>
          }
          style={{flex: 1}}
          data={expenses}
          renderItem={({item}) => (
            <View>
              <StyledText>{item.name}</StyledText>
            </View>
          )}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: getSize.m(16),
  },
  descriptionCard: {
    padding: getSize.m(16),
    marginTop: getSize.m(8),
  },
  descriptionText: {
    color: 'white',
  },
  detailText: {
    color: 'white',
    fontSize: getSize.m(12),
    marginTop: getSize.m(4),
    fontWeight: '400',
  },
  outer: {
    flex: 1,
    padding: getSize.m(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: getSize.m(24),
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
  },
  deleteBtn: {
    marginLeft: getSize.m(8),
  },
});

export default TripDetailScreen;

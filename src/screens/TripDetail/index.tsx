import React, {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StatusBarAware} from '@components/layout/StatusBarAware';
import {StorageService} from '@services/StorageService';
import StyledText from '@components/common/Text';
import {getSize} from '@utils/ui.utils';
import {Button, Card, FAB, useTheme} from 'react-native-paper';
import {paperTheme} from '@configs/theme.config';
import {SectionTitle} from '@components/common/SectionTitle';
import Icon from 'react-native-vector-icons/Ionicons';
import AddExpenseModal from '@screens/TripDetail/AddExpenseModal';
import {useToast} from 'react-native-paper-toast';
import {useAppDispatch} from '@redux/store';
import {loadAppTrips} from '@redux/actions/app.actions';
import {EXPENSE_CATEGORIES} from '@configs/app.config';
import moment from 'moment';
import {TripMap} from '@components/app/TripMap';

const TripDetailScreen = () => {
  const toaster = useToast();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {params} = useRoute();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const {colors} = useTheme();

  const {tripId} = params as any;

  useEffect(() => {
    StorageService.getTrip(tripId).then(data => {
      setTrip(data);
      navigation.setOptions({
        title: 'Trip: ' + data.name,
      });
      reloadExpenses();
    });
  }, [params]);

  const reloadExpenses = () => {
    StorageService.getTripExpenses(tripId).then(dataExpenses => {
      setExpenses(dataExpenses);
    });
  };

  const onDelete = () => {
    Alert.alert(
      'Confirm',
      'Are sure you want to delete this Trip?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            if (trip?.id) {
              StorageService.deleteTrip(trip.id).then(() => {
                toaster.show({
                  message: 'Trip deleted',
                });
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Main'}],
                });
              });
              dispatch(loadAppTrips());
            }
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onEdit = () => {
    navigation.navigate('NewTrip', {
      mode: 'edit',
      tripId: tripId,
    });
  };

  return (
    <>
      <StatusBarAware />
      {trip && (
        <FlatList
          ListHeaderComponent={
            <View style={styles.outer}>
              <View style={{alignItems: 'flex-end'}}>
                <View style={styles.controls}>
                  <Button
                    icon={'pencil'}
                    mode={'contained'}
                    onPress={() => onEdit()}>
                    Edit
                  </Button>
                  <Button
                    style={styles.deleteBtn}
                    icon={'delete'}
                    mode={'contained'}
                    buttonColor={paperTheme.colors.danger}
                    textColor={'white'}
                    onPress={() => onDelete()}>
                    Delete
                  </Button>
                </View>
              </View>
              <View style={styles.header}>
                <StyledText style={styles.title}>{trip.name}</StyledText>
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
                    {trip.description.trim() === ''
                      ? 'No description'
                      : trip.description}
                  </StyledText>
                </Card>
              </View>
              <View style={styles.section}>
                <SectionTitle>DESTINATION</SectionTitle>
                <TripMap dataLocation={trip.coordinates} />
              </View>
              <View style={styles.section}>
                <SectionTitle>EXPENSES</SectionTitle>
              </View>
            </View>
          }
          style={{flex: 1}}
          data={expenses}
          renderItem={({item}) => {
            console.log(item);
            return (
              <View style={styles.expenseItem}>
                <View style={styles.row}>
                  <StyledText style={styles.expenseName}>
                    {item.name}
                  </StyledText>
                  <StyledText style={styles.expenseName}>
                    ${item.cost}
                  </StyledText>
                </View>
                <View style={styles.row}>
                  <StyledText style={styles.expenseCat}>
                    {EXPENSE_CATEGORIES.find(i => i.key === item.category)
                      ?.title || item.category}
                  </StyledText>
                  <StyledText style={styles.expenseDate}>
                    {moment(item.date, 'll').format('ll')}
                  </StyledText>
                </View>
              </View>
            );
          }}
        />
      )}
      {trip && (
        <AddExpenseModal
          tripId={trip.id as number}
          visible={openExpenseModal}
          onClose={() => {
            setOpenExpenseModal(false);
            reloadExpenses();
          }}
        />
      )}
      <FAB
        icon="plus"
        color={colors.background}
        style={styles.fab}
        onPress={() => setOpenExpenseModal(true)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expenseItem: {
    marginHorizontal: getSize.m(16),
    marginBottom: getSize.m(16),
    padding: getSize.m(16),
    backgroundColor: paperTheme.colors.inputBg,
    elevation: 2,
    borderRadius: getSize.m(4),
  },
  expenseName: {
    color: 'white',
    fontWeight: '500',
  },
  expenseCat: {
    color: paperTheme.colors.primary,
  },
  expenseDate: {
    color: '#ffffff33',
  },
  fab: {
    position: 'absolute',
    margin: getSize.m(16),
    right: 0,
    bottom: 0,
    backgroundColor: paperTheme.colors.primary,
  },
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

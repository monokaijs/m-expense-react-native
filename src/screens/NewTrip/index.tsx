import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import StyledText from '@components/common/Text';
import {StatusBarAware} from '@components/layout/StatusBarAware';
import {
  ActivityIndicator,
  Button,
  Checkbox,
  Switch,
  TextInput,
} from 'react-native-paper';
import {SectionTitle} from '@components/common/SectionTitle';
import {getSize} from '@utils/ui.utils';
import {DatePickerInput} from 'react-native-paper-dates';
import {StorageService} from '@services/StorageService';
import {loadAppTrips} from '@redux/actions/app.actions';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch} from '@redux/store';
import {useToast} from 'react-native-paper-toast';
import {ApiService} from '@services/ApiService';

const defaultTrip: Trip = {
  name: '',
  description: '',
  destination: '',
  budget: 0,
  date: '',
  requiresRiskAssessment: false,
  coordinate: '',
};

let checkIntervalId: number;
const NewTripScreen = () => {
  const toaster = useToast();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [trip, setTrip] = useState<Trip>(defaultTrip);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [destinationValid, setDestinationValid] = useState(true);
  const [autoCorrect, setAutoCorrect] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const {params} = useRoute() as any;

  useEffect(() => {
    if (params?.mode === 'edit') {
      navigation.setOptions({
        title: 'Edit Trip',
      });
      StorageService.getTrip(params.tripId).then(data => {
        console.log('data', data);
        setTrip(data);
        setCurrentDate(new Date(data.date));
      });
    }
  }, [params]);

  useEffect(() => {
    setTrip({
      ...trip,
      date: currentDate.toUTCString(),
    });
  }, [currentDate]);

  const onFinish = () => {
    if (
      trip.name.trim() === '' ||
      trip.destination.trim() === '' ||
      trip.date.trim() === ''
    ) {
      toaster.show({
        message:
          'Please enter all required information (Trip name, destination & date).',
      });
      return;
    }
    if (!destinationValid) {
      toaster.show({
        message: 'Invalid destination, please correct it first.',
      });
      return;
    }
    if (params?.mode === 'edit') {
      StorageService.updateTrip(trip).then(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
        dispatch(loadAppTrips());
        toaster.show({
          message: 'Trip saved.',
        });
      });
    } else {
      StorageService.addTrip(trip).then(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
        dispatch(loadAppTrips());
        toaster.show({
          message: 'Trip added.',
        });
      });
    }
  };

  return (
    <View style={styles.outer}>
      <StatusBarAware />
      <ScrollView style={styles.form} contentContainerStyle={styles.formInner}>
        <StyledText style={styles.title}>
          {params?.mode === 'edit' ? 'Edit trip' : 'Create new trip'}
        </StyledText>
        <View style={styles.formGroup}>
          <SectionTitle>TRIP NAME</SectionTitle>
          <TextInput
            value={trip.name}
            onChangeText={value => {
              setTrip({
                ...trip,
                name: value,
              });
            }}
            mode={'outlined'}
            style={styles.input}
            placeholder={'Trip name'}
            textColor={'white'}
            placeholderTextColor={'#ffffff55'}
            outlineColor={'#171C20'}
          />
        </View>
        <View style={styles.formGroup}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SectionTitle>DESTINATION</SectionTitle>
              {locationLoading && (
                <ActivityIndicator style={{marginLeft: 8}} size={16} />
              )}
            </View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setAutoCorrect(!autoCorrect)}
              activeOpacity={0.8}>
              <StyledText style={{color: 'white'}}>Auto-correct</StyledText>
              <Checkbox status={autoCorrect ? 'checked' : 'unchecked'} />
            </TouchableOpacity>
          </View>
          <TextInput
            value={trip.destination}
            onChangeText={value => {
              if (checkIntervalId) {
                clearInterval(checkIntervalId);
              }
              setTrip({
                ...trip,
                destination: value,
              });
              checkIntervalId = setTimeout(() => {
                if (value.trim() === '') {
                  return;
                }
                setLocationLoading(true);
                ApiService.getLocationCoordinate(value).then(response => {
                  setLocationLoading(false);
                  if (!(response.results && response.results.length > 0)) {
                    // invalid address
                    setDestinationValid(false);
                  } else {
                    const tripObject: Trip = {
                      ...trip,
                      destination: value,
                    };
                    const addressDetail = response.results[0];
                    value = addressDetail.formatted_address;
                    if (autoCorrect) {
                      tripObject.destination = value;
                    }
                    tripObject.coordinate = JSON.stringify(
                      addressDetail.geometry,
                    );
                    setTrip(tripObject);
                  }
                });
              }, 1000);
            }}
            mode={'outlined'}
            style={styles.input}
            placeholder={'Destination'}
            textColor={'white'}
            placeholderTextColor={'#ffffff55'}
            outlineColor={'#171C20'}
            activeOutlineColor={destinationValid ? undefined : 'red'}
          />
        </View>
        <View style={styles.formGroup}>
          <SectionTitle>DATE</SectionTitle>
          <DatePickerInput
            value={currentDate}
            onChange={date => date && setCurrentDate(date)}
            locale="en"
            mode={'outlined'}
            inputMode="start"
            style={styles.input}
            placeholderTextColor={'#ffffff55'}
            outlineColor={'#171C20'}
          />
        </View>
        <View style={styles.formGroup}>
          <SectionTitle>DESCRIPTION</SectionTitle>
          <TextInput
            value={trip.description}
            onChangeText={value =>
              setTrip({
                ...trip,
                description: value,
              })
            }
            multiline
            numberOfLines={4}
            mode={'outlined'}
            style={styles.input}
            placeholder={'Description...'}
            textColor={'white'}
            placeholderTextColor={'#ffffff55'}
            outlineColor={'#171C20'}
          />
        </View>
        <View style={styles.formGroup}>
          <SectionTitle>BUDGET</SectionTitle>
          <TextInput
            value={trip.budget.toString()}
            onChangeText={number => {
              const value = parseInt(number, 10);
              setTrip({
                ...trip,
                budget: Number.isNaN(value) ? 0 : value,
              });
            }}
            keyboardType={'numeric'}
            left={<TextInput.Icon icon={'currency-usd'} />}
            mode={'outlined'}
            style={styles.input}
            placeholder={'Budget'}
            textColor={'white'}
            placeholderTextColor={'#ffffff55'}
            outlineColor={'#171C20'}
          />
        </View>
      </ScrollView>
      <View style={styles.actionArea}>
        <View style={styles.toggleArea}>
          <StyledText style={styles.toggleLabel}>
            Requires Risk Assessment
          </StyledText>
          <Switch
            value={trip.requiresRiskAssessment}
            onValueChange={checked =>
              setTrip({
                ...trip,
                requiresRiskAssessment: checked,
              })
            }
          />
        </View>
        <Button mode={'contained'} onPress={onFinish}>
          FINISH
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: getSize.m(24),
    fontWeight: '500',
    marginBottom: getSize.m(16),
    color: 'white',
  },
  outer: {
    flex: 1,
  },
  input: {
    fontSize: getSize.m(12),
    color: 'white',
    backgroundColor: '#171C20',
  },
  form: {
    flex: 1,
  },
  formInner: {padding: 16},
  formGroup: {
    marginBottom: getSize.m(16),
  },
  actionArea: {
    borderTopWidth: 1,
    borderTopColor: '#ffffff33',
    padding: getSize.m(16),
  },
  toggleArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: getSize.m(16),
  },
  toggleLabel: {
    color: 'white',
  },
});

export default NewTripScreen;

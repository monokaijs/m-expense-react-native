import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import StyledText from '@components/common/Text';
import {StatusBarAware} from '@components/layout/StatusBarAware';
import {Button, Switch, TextInput} from 'react-native-paper';
import {SectionTitle} from '@components/common/SectionTitle';
import {getSize} from '@utils/ui.utils';
import {DatePickerInput} from 'react-native-paper-dates';
import {StorageService} from '@services/StorageService';

const defaultTrip: Trip = {
  name: '',
  description: '',
  destination: '',
  budget: 0,
  date: '',
  requiresRiskAssessment: false,
};

const NewTripScreen = () => {
  const [trip, setTrip] = useState<Trip>(defaultTrip);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setTrip({
      ...trip,
      date: currentDate.toUTCString(),
    });
  }, [currentDate]);

  const onFinish = () => {
    StorageService.addTrip(trip).then(() => {
      Alert.alert('SHIT!');
    });
  };

  return (
    <View style={styles.outer}>
      <StatusBarAware />
      <ScrollView style={styles.form} contentContainerStyle={styles.formInner}>
        <StyledText style={styles.title}>Create new trip</StyledText>
        <View style={styles.formGroup}>
          <SectionTitle>TRIP NAME</SectionTitle>
          <TextInput
            value={trip.name}
            onChangeText={value =>
              setTrip({
                ...trip,
                name: value,
              })
            }
            mode={'outlined'}
            style={styles.input}
            placeholder={'Trip name'}
            textColor={'white'}
            placeholderTextColor={'#ffffff55'}
            outlineColor={'#171C20'}
          />
        </View>
        <View style={styles.formGroup}>
          <SectionTitle>DESTINATION</SectionTitle>
          <TextInput
            value={trip.destination}
            onChangeText={value =>
              setTrip({
                ...trip,
                destination: value,
              })
            }
            mode={'outlined'}
            style={styles.input}
            placeholder={'Destination'}
            textColor={'white'}
            placeholderTextColor={'#ffffff55'}
            outlineColor={'#171C20'}
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

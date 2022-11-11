import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store, useAppDispatch} from '@redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {MainStackNavigation} from '@navigations/MainStackNavigation';
import {Provider as PaperProvider} from 'react-native-paper';
import {navigationTheme, paperTheme} from '@configs/theme.config';
import SQLite from 'react-native-sqlite-storage';
import {StorageService} from '@services/StorageService';
import {registerTranslation} from 'react-native-paper-dates';
import {loadAppTrips} from '@redux/actions/app.actions';

registerTranslation('en', {
  save: 'Save',
  selectSingle: 'Select date',
  selectMultiple: 'Select dates',
  selectRange: 'Select period',
  notAccordingToDateFormat: inputFormat => `Date format must be ${inputFormat}`,
  mustBeHigherThan: date => `Must be later then ${date}`,
  mustBeLowerThan: date => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: 'Day is not allowed',
  previous: 'Previous',
  next: 'Next',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Pick date from calendar',
  close: 'Close',
});

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    SQLite.enablePromise(true);
    StorageService.register().then(() => {
      console.log('Storage has been registered successfully');
      dispatch(loadAppTrips());
    });
  }, []);
  return (
    <PaperProvider theme={paperTheme as any}>
      <BottomSheetModalProvider>
        <NavigationContainer theme={navigationTheme}>
          <MainStackNavigation />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </PaperProvider>
  );
};

const AppContainer = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default AppContainer;

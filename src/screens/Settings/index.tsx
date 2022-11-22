import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import StyledText from '@components/common/Text';
import {StatusBarAware} from '@components/layout/StatusBarAware';
import {Button, Card, TextInput} from 'react-native-paper';
import {getSize} from '@utils/ui.utils';
import {v4} from 'uuid';
import Clipboard from '@react-native-community/clipboard';
import {useToast} from 'react-native-paper-toast';
import {ApiService} from '@services/ApiService';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {GoogleDriveService} from '@services/GoogleDriveService';
import {StorageService} from '@services/StorageService';
import {loadAppTrips} from '@redux/actions/app.actions';

const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const toaster = useToast();
  const [userId, setUserId] = useState(v4());
  const {trips} = useAppSelector(state => state.app);
  const [loading, setLoading] = useState(false);
  const [loadingDrive, setLoadingDrive] = useState(false);
  const [fileName, setFileName] = useState('trips.txt');
  const {isSignedIn} = useAppSelector(state => state.auth);

  const onCopy = () => {
    Clipboard.setString(userId);
    toaster.show({
      message: 'Copied to clipboard.',
    });
  };
  const onSync = () => {
    setLoading(true);
    ApiService.saveTrips(userId, trips).then(response => {
      // const total = response.
      if (response.uploadResponseCode === 'SUCCESS') {
        toaster.show({
          message: `Uploaded successfully to server (${response.number} total).`,
        });
      } else {
        toaster.show({
          message: 'Failed to upload.',
        });
      }
      setLoading(false);
    });
  };
  const onSyncDrive = async () => {
    setLoadingDrive(true);
    try {
      await GoogleDriveService.uploadFile(fileName, JSON.stringify(trips));
      toaster.show({
        message: 'Uploaded successfully.',
      });
    } catch (e) {
      console.log(e);
      toaster.show({
        message: 'Failed to sync. Unexpected error.',
      });
    }
    setLoadingDrive(false);
  };
  const onClearData = async () => {
    try {
      await StorageService.cleanData();
      await dispatch(loadAppTrips());
      await toaster.show({
        message: 'All data cleared',
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.outer}>
      <StatusBarAware />
      <Card style={styles.sectionCard}>
        <StyledText style={styles.title}>Personal</StyledText>
        <StyledText style={styles.description}>User ID: {userId}</StyledText>
        <Button mode={'contained'} onPress={onCopy}>
          Copy
        </Button>
      </Card>
      <Card style={styles.sectionCard}>
        <StyledText style={styles.title}>Sync Data</StyledText>
        <StyledText style={styles.description}>
          Sync all your trips to access them everywhere, across any devices.
        </StyledText>
        <Button mode={'contained'} onPress={onSync} loading={loading}>
          Sync all trips
        </Button>
      </Card>
      <Card style={styles.sectionCard}>
        <StyledText style={styles.title}>Sync to Drive</StyledText>
        <StyledText style={styles.description}>
          Sync all trips to Google Drive.
        </StyledText>
        <View style={{marginBottom: getSize.m(16)}}>
          <TextInput
            mode={'outlined'}
            label={'File name'}
            value={fileName}
            onChangeText={val => setFileName(val)}
          />
        </View>
        <Button
          mode={'contained'}
          onPress={onSyncDrive}
          loading={loadingDrive}
          disabled={!isSignedIn}>
          Sync now
        </Button>
      </Card>
      <Card style={styles.sectionCard}>
        <StyledText style={styles.title}>Clear data</StyledText>
        <StyledText style={styles.description}>
          Clear all stored data.
        </StyledText>
        <Button mode={'contained'} onPress={onClearData}>
          Clear now
        </Button>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outer: {},
  sectionCard: {
    margin: getSize.m(16),
    padding: getSize.m(16),
    borderRadius: getSize.m(16),
  },
  description: {
    fontSize: getSize.m(14),
    color: '#ffffff88',
    marginVertical: getSize.m(16),
  },
  title: {
    color: 'white',
    fontSize: getSize.m(20),
    fontWeight: '600',
  },
});

export default SettingsScreen;

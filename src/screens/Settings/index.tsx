import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import StyledText from '@components/common/Text';
import {StatusBarAware} from '@components/layout/StatusBarAware';
import {Button, Card} from 'react-native-paper';
import {getSize} from '@utils/ui.utils';
import {v4 as uuidv4} from 'uuid';
import Clipboard from '@react-native-community/clipboard';
import {useToast} from 'react-native-paper-toast';
import {ApiService} from '@services/ApiService';
import {useAppSelector} from '@redux/store';

const SettingsScreen = () => {
  const toaster = useToast();
  const [userId, setUserId] = useState(uuidv4());
  const {trips} = useAppSelector(state => state.app);
  const onCopy = () => {
    Clipboard.setString(userId);
    toaster.show({
      message: 'Copied to clipboard.',
    });
  };
  const onSync = () => {
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
    });
  };
  return (
    <View style={styles.outer}>
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
        <Button mode={'contained'} onPress={onSync}>
          Sync all trips
        </Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {},
  sectionCard: {
    margin: getSize.m(16),
    marginBottom: 0,
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

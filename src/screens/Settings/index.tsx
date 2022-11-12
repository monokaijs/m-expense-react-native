import React from 'react';
import {StyleSheet, View} from 'react-native';
import StyledText from '@components/common/Text';
import {StatusBarAware} from '@components/layout/StatusBarAware';

const SettingsScreen = () => {
  return (
    <View style={styles.outer}>
      <StatusBarAware />
      <StyledText>App Settings</StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {},
});

export default SettingsScreen;

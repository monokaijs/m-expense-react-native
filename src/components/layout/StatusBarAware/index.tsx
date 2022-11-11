import React from 'react';
import {StatusBar, StatusBarProps} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

export function StatusBarAware(props: StatusBarProps) {
  const isFocused = useIsFocused();

  return isFocused ?
    <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} {...props} />
    : null;
}

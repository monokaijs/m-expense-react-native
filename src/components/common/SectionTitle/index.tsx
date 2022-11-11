import React, {PropsWithChildren} from 'react';
import StyledText from '@components/common/Text';
import {StyleSheet} from 'react-native';
import {paperTheme} from '@configs/theme.config';

export const SectionTitle = ({children}: PropsWithChildren) => {
  return <StyledText style={styles.title}>{children}</StyledText>;
};

const styles = StyleSheet.create({
  title: {
    color: paperTheme.colors.primary,
    textTransform: 'uppercase',
  },
});

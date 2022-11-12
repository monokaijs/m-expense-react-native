import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import StyledText from '@components/common/Text';
import {convertFont, getSize} from '@utils/ui.utils';
import Icon from 'react-native-vector-icons/Ionicons';
import {StatusBarAware} from '@components/layout/StatusBarAware';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch} from '@redux/store';
import {loadAppTrips} from '@redux/actions/app.actions';
import {useNavigation} from '@react-navigation/native';

export const HomeHeader = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const styles = useStyles(colors);
  return (
    <View style={styles.outer}>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Icon name={'menu'} color={colors.background} size={getSize.m(28)} />
      </TouchableOpacity>

      <StatusBarAware />
      <StyledText style={styles.title}>Welcome back,</StyledText>
      <StyledText style={styles.greeting}>Have a nice day.</StyledText>
      <View style={styles.searchInput}>
        <TextInput
          placeholder={'Search...'}
          style={styles.searchInputInner as any}
          onChangeText={query => {
            dispatch(loadAppTrips(query));
          }}
        />
        <View style={styles.searchIndicator}>
          <Icon name={'search'} color={colors.primary} />
        </View>
      </View>
    </View>
  );
};

const useStyles = (colors: any) => {
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    actionBtn: {
      padding: getSize.m(8),
      marginLeft: getSize.m(-10),
      marginBottom: getSize.m(8),
    },
    outer: {
      backgroundColor: colors.primary,
      padding: getSize.m(32),
      paddingTop: getSize.m(32) + insets.top,
      borderBottomLeftRadius: getSize.m(32),
      borderBottomRightRadius: getSize.m(32),
    },
    title: {
      fontSize: getSize.m(24),
      fontWeight: '600',
    },
    greeting: {},
    searchInput: {
      position: 'relative',
      flexDirection: 'row',
      backgroundColor: '#00000022',
      marginTop: getSize.m(16),
      borderRadius: 99,
      paddingHorizontal: getSize.m(6),
      alignItems: 'center',
    },
    searchInputInner: {
      flex: 1,
      ...convertFont('400'),
      paddingLeft: getSize.m(8),
    },
    searchIndicator: {
      height: getSize.m(32),
      aspectRatio: 1,
      backgroundColor: colors.background,
      borderRadius: 99,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

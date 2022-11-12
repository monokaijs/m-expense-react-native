import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getSize} from '@utils/ui.utils';
import {List, useTheme} from 'react-native-paper';
import StyledText from '@components/common/Text';
import Icon from 'react-native-vector-icons/Ionicons';

export const CustomDrawer = ({state, descriptors, navigation}: any) => {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();
  const styles = useStyles(colors, insets);

  const closeDrawer = () => {
    navigation.closeDrawer();
  };

  const openSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.outer}>
      <View style={styles.header}>
        <StyledText style={styles.title}>M-Expense</StyledText>
        <TouchableOpacity onPress={() => closeDrawer()} style={styles.closeBtn}>
          <Icon name={'close'} color={'white'} size={getSize.m(24)} />
        </TouchableOpacity>
      </View>
      <List.Item
        style={styles.listItem}
        title={'Settings'}
        left={() => <List.Icon icon={'cog'} />}
        onPress={() => openSettings()}
      />
    </View>
  );
};

const useStyles = (colors: any, insets: any) => {
  return StyleSheet.create({
    closeBtn: {
      padding: getSize.m(16),
      marginRight: getSize.m(-16),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: getSize.m(16),
    },
    listItem: {
      paddingHorizontal: getSize.m(16),
    },
    title: {
      fontSize: getSize.m(24),
      fontWeight: '700',
      color: colors.primary,
      paddingVertical: getSize.m(16),
    },
    outer: {
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      backgroundColor: colors.background,
    },
  });
};

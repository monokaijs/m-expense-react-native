import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import StyledText from '@components/common/Text';
import {convertFont, getSize} from '@utils/ui.utils';
import Icon from 'react-native-vector-icons/Ionicons';
import {StatusBarAware} from '@components/layout/StatusBarAware';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {loadAppTrips} from '@redux/actions/app.actions';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {doAuth} from '@redux/actions/auth.actions';

export const HomeHeader = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const {isSignedIn, account} = useAppSelector(state => state.auth);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '915016006206-hgetd4329urh2goutuqbindpjmqla47n.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }, []);

  const onSignIn = async () => {
    if (isSignedIn) {
      return;
    }
    dispatch(doAuth());
  };

  return (
    <View style={styles.outer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Icon name={'menu'} color={colors.background} size={getSize.m(28)} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSignIn}
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: getSize.m(16),
            paddingHorizontal: getSize.m(4),
            paddingVertical: getSize.m(4),
            borderRadius: 99,
          }}>
          <StyledText>
            {isSignedIn && account ? account.givenName : 'Sign In'}
          </StyledText>
          <Image
            source={
              !isSignedIn || !account
                ? require('@assets/img/default-avatar.png')
                : {
                    uri: account.photo,
                  }
            }
            style={{
              marginLeft: getSize.m(8),
              width: getSize.m(24),
              height: getSize.m(24),
              resizeMode: 'contain',
              borderRadius: getSize.m(32),
            }}
          />
        </TouchableOpacity>
      </View>

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

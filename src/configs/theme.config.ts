import {MD3DarkTheme as PaperDefaultTheme} from 'react-native-paper';
import {DefaultTheme as NavigationTheme} from '@react-navigation/native';

export const paperTheme = {
  ...PaperDefaultTheme,
  roundness: 4,
  version: 3,
  colors: {
    ...PaperDefaultTheme.colors,
    danger: '#ff4f4f',
    primary: '#bbf246',
    inputBg: '#171C20',
    lightBlue: '#EAF1FB',
    midBlue: '#4164B5',
    darkBlue: '#19233B',
    grey1: '#78787B',
    grey2: '#ABABAB',
    grey3: '#FAFAFA',
    green: '#77A98B',
    red: '#BD5045',
    border: '#E6E6E6',
    background: '#21292E',
    deepBlack: '#1A1A1A',
    white: '#FFFFFF',
    backgroundSheet: '#F7F7F7',
    tint: '#c9f56c',
  },
};

export const navigationTheme = {
  ...NavigationTheme,
  colors: {
    ...NavigationTheme.colors,
    background: paperTheme.colors.background,
  },
};

export type PaperThemeOverride = typeof paperTheme;
export type PaperThemeColorsOverride = typeof paperTheme.colors;

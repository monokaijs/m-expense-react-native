import {
  PaperThemeColorsOverride,
  PaperThemeOverride,
} from '@configs/theme.config';
import {RootStackParamList} from '@navigations/MainStackNavigation';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors extends PaperThemeColorsOverride {}
    interface Theme extends PaperThemeOverride {}
  }
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface NavigationProp {
      openDrawer: any;
    }
  }
}

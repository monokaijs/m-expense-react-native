import {Dimensions, Platform, StatusBar} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const convertFont = (weight?: string) => {
  let fontFamily = '';
  let fontWeight = weight || '400';

  switch (fontWeight) {
    case '100':
      fontFamily = 'SVN-PoppinsThin';
      break;
    case '200':
      fontFamily = 'SVN-PoppinsXLight';
      break;
    case '300':
      fontFamily = 'SVN-PoppinsLight';
      break;
    case '400':
      fontFamily = 'SVN-PoppinsMedium';
      break;
    case '500':
      fontFamily = 'SVN-PoppinsSemiBold';
      break;
    case '600':
      fontFamily = 'SVN-PoppinsBold';
      break;
    case '700':
      fontFamily = 'SVN-PoppinsExtraBold';
      break;
    case '800':
    case '900':
      fontFamily = 'SVN-PoppinsThin';
      break;
    default:
      fontFamily = 'SVN-PoppinsMedium';
  }

  return {
    fontFamily,
    fontWeight: Platform.OS === 'ios' ? fontWeight : 'normal',
  };
};
export const {width, height} = Dimensions.get('screen');
export const statusBarHeight: number = StatusBar.currentHeight
  ? StatusBar.currentHeight
  : 0;
/**
 *
 * getSize.m(10) Responsive for padding - margin - fontSize.
 *
 * getSize.s(10) Responsive by width screen. (Image Size)
 *
 * getSize.v(10) Responsive by height screen.
 **/
export const getSize = {
  m: moderateScale,
  s: scale,
  v: verticalScale,
};

export const isSmallDevice = () => {
  if (width <= 375) {
    return true;
  }

  return false;
};

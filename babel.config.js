module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@components': './src/components',
          '@configs': './src/configs',
          '@navigations': './src/navigations',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@redux': './src/redux',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@utils': './src/utils',
        },
      },
    ],
    // Make sure this is the last one.
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
  ],
};

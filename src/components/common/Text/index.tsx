import React from 'react';
import {Text, TextProps} from 'react-native';
import {convertFont, getSize} from '@utils/ui.utils';

interface CustomTextProps extends TextProps {
  size?: number;
}

const StyledText = (props: CustomTextProps) => {
  let style = {
    ...(props.style || ({} as any)),
  };
  // @ts-ignore
  if (props.style && props.style.length && props.style.length > 1) {
    for (let currentStyles of props.style as any[]) {
      style = {
        ...style,
        ...currentStyles,
      };
    }
  }
  const finalStyles = {
    fontSize: props.size ? getSize.m(props.size) : getSize.m(13),
    ...style,
    ...convertFont(style?.fontWeight),
  };
  return (
    <Text {...props} style={finalStyles}>
      {props.children}
    </Text>
  );
};

export default StyledText;

import React from 'react';
import { RGBColor } from 'react-color';

interface TextProps {
  text: string
  font: string
  color: RGBColor
  path: string
}

export default function Text(props: TextProps) {

  const textStyle = {
    fontFamily: props.font,
    fill: `rgba(${ props.color.r }, ${ props.color.g }, ${ props.color.b }, ${ props.color.a })`
  };

  return (
      <text>
        <textPath href={props.path} style={textStyle}>{props.text}</textPath>
      </text>
  );
};


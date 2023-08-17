import React from 'react';
import { RGBColor } from 'react-color';

interface TextProps {
  text: string
  font: string
  color: RGBColor
  path: string
  x: number
  y: number
}

export default function Text(props: TextProps) {

  const textStyle = {
    fontFamily: props.font,
    fill: `rgba(${ props.color.r }, ${ props.color.g }, ${ props.color.b }, ${ props.color.a })`
  };

  return (
      <text>
        <textPath href={props.path} x={props.x} y={props.y} style={textStyle}>{props.text}</textPath>
      </text>
  );
};


import React from 'react';
import { RGBColor } from 'react-color';

interface TextProps {
  text: string,
  anchor: string,
  size: number,
  font: string,
  color: RGBColor,
  path: string,
  pathLength: number
}

export default function Text(props: TextProps) {

  const textStyle = {
    fontFamily: props.font,
    fontSize: `${props.size}px`,
    fill: `rgba(${ props.color.r }, ${ props.color.g }, ${ props.color.b }, ${ props.color.a })`
  };

  let anchorPosition = (props.anchor=='start') ? 0 :
                        (props.anchor == 'middle') ? (props.pathLength / 2) :
                        (props.anchor == 'end') ? props.pathLength : 0;

  return (
      <text x={anchorPosition} textAnchor={props.anchor}>
        <textPath href={props.path} style={textStyle}>{props.text}</textPath>
      </text>
  );
};


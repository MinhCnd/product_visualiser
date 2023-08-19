'use client'
import React from 'react';
import styles from './styles.module.css';
import Text from './text';
import { RGBColor } from 'react-color';
import { Point } from 'svg-path-properties/dist/types/types';

interface pathTextProps {
  width: number,
  height: number
  text: string,
  font: string,
  color: RGBColor,
  pathStart: Point,
  pathEnd: Point
}
export default function PathText(props: pathTextProps) {

  const pathString = `M${props.pathStart.x},${props.pathStart.y} ${props.pathEnd.x},${props.pathEnd.y}`

  return (
    <div className={styles.pathText}>
    <svg width={props.width} height={props.height}>
      <path id="TextPath"  d={pathString}/>
        <Text text={props.text} font={props.font} color={props.color} path='#TextPath'/>
    </svg>
  </div>
  )
}

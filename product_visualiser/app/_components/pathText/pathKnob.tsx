import React from "react";
import { Point } from "./types";
import styles from './styles.module.css'

interface PathKnobProps {
  point: Point;
  radius: number;
  onMouseDown: () => void;
  onMouseUp?: () => void;
  onMouseMove: (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => void;
}

export default function PathKnob(props: PathKnobProps) {
  return (
    <circle
      className={styles.pathKnob}
      cx={props.point.x}
      cy={props.point.y}
      r={props.radius}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseMove={props.onMouseMove}
  />
  )
}

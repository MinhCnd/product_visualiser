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
    <g onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseMove={props.onMouseMove}>
      {/*Smaller visible knob*/}
      <circle
        className={styles.pathKnob}
        cx={props.point.x}
        cy={props.point.y}
        r={props.radius}
      />
      {/*Larger invisible circle to provide touch area*/}
      <circle
        className={styles.pathKnobTouchArea}
        cx={props.point.x}
        cy={props.point.y}
        r={props.radius*4}
      />
    </g>
  )
}

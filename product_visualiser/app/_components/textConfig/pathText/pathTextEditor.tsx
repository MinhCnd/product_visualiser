'use client'
import React, { useState } from 'react';
import styles from './styles.module.css';
import { Point } from './types';
import PathKnob from './pathKnob';

interface pathEditorProps {
  width: number,
  height: number,
  pathStart: Point,
  pathEnd: Point,
  editMode: boolean,
  onPathStartChange: (point: Point) => void,
  onPathEndChange: (point: Point) => void
}

export default function PathEditor(props: pathEditorProps) {

  const RADIUS_PX = 5;

  const [draggingKnob, setDraggingKnob] = useState<string | null>(null);

  const handleDragStart = () => {
    setDraggingKnob('start');
  };

  const handleDragEnd = () => {
    setDraggingKnob('end');
  };

  const handleDragStop = () => {
    setDraggingKnob(null);
  }

  const handleDrag = (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
    if (draggingKnob) {
      const boundingRect = event.currentTarget.parentElement?.getBoundingClientRect();
      if (boundingRect) {
        const x = event.clientX - boundingRect.left;
        const y = event.clientY - boundingRect.top;
        if (draggingKnob === 'start') {
          props.onPathStartChange({x: x,y: y})
        } else if (draggingKnob === 'end') {
          props.onPathEndChange({x: x,y: y})
        }
      }
    }
  };

  const pathString = `M${props.pathStart.x},${props.pathStart.y} ${props.pathEnd.x},${props.pathEnd.y}`

  return (
    <div className={styles.pathTextEditor}>
      { props.editMode && (
          <svg width={props.width} height={props.height} onMouseUp={handleDragStop}>
            <path className={styles.path} id="EditPath" d={pathString}/>
            <PathKnob point={props.pathStart} radius={RADIUS_PX} onMouseDown={handleDragStart} onMouseMove={handleDrag}/>
            <PathKnob point={props.pathEnd} radius={RADIUS_PX} onMouseDown={handleDragEnd} onMouseMove={handleDrag}/>
        </svg>
        )
      }
    </div>
  )
}

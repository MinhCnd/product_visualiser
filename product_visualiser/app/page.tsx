'use client'
import React, { useState } from 'react';
import Canvas from './_components/canvas';
import PathText from './_components/textConfig/pathText/pathText';
import { RGBColor } from 'react-color';
import PathEditor from './_components/textConfig/pathText/pathTextEditor';
import { Point } from 'svg-path-properties/dist/types/types';
import {SelectChangeEvent} from '@mui/material';
import TextConfig from './_components/textConfig/textConfig';

export default function Home() {

  const [text, setText] = useState('Hello World');
  const [textAlignment, setTextAlignment] = useState('left');
  const [textSizePx, setTextSizePx] = useState(30);
  const [font, setFont] = useState('Times New Roman');
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1} as RGBColor);
  const [editPath, setEditPath] = useState(false);
  const [pathStart, setPathStart] = useState<Point>({x: 120, y: 250});
  const [pathEnd, setPathEnd] = useState<Point>({x:310, y:170});

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleAlignmentChange = (newAlignment: string) => {
    setTextAlignment(newAlignment);
  }

  const handleTextSizeChange = (event: SelectChangeEvent<number>) => setTextSizePx(parseInt(event.target.value.toString()));

  const handleFontChange = (event: SelectChangeEvent<string>) => {
    setFont(event.target.value);
  }

  const handleColorChange = (newColor: RGBColor) => {
    setColor(newColor);
  }

  const handleEditPathChange = () => {
    setEditPath(!editPath);
  }

  const getPathLength = (startPoint: Point, endPoint: Point) => {
    const dy = Math.abs(endPoint.y - startPoint.y);
    const dx = Math.abs(endPoint.x - startPoint.x);
    return Math.sqrt(Math.pow(dy,2)+Math.pow(dx,2));
  }

  return (
    <main className="top-container">
      <div className='header-container'>
        <header style={{padding: '10px'}}>
          <h1>Customize</h1>
        </header>
      </div>
      <div className='main-container'>
        <div className='view-container'>
          <div className='canvas-container'>
          <Canvas width={500} height={500} imageSrc='/waterBottle.jpeg' text=''/>
          </div>
          <PathText width={500}
            height={500}
            text={text}
            textSizePx={textSizePx}
            textAnchor={textAlignment}
            font={font} color={color}
            pathStart={pathStart}
            pathEnd={pathEnd}
            pathLength={getPathLength(pathEnd, pathStart)}
            />
          <PathEditor width={500} height={500} pathStart={pathStart} pathEnd={pathEnd} onPathStartChange={setPathStart} onPathEndChange={setPathEnd} editMode={editPath}></PathEditor>
        </div>
        <div className="editor-container">
          <TextConfig text={text} textAlignment={textAlignment} textSizePx={textSizePx} font={font} color={color} editPath={editPath}
          handleTextChange={handleTextChange} handleAlignmentChange={handleAlignmentChange} handleColorChange={handleColorChange}
          handleEditPathChange={handleEditPathChange} handleFontChange={handleFontChange} handleTextSizeChange={handleTextSizeChange}/>
        </div>
      </div>
    </main>
  )
}

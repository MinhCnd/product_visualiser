'use client'
import React, { useState } from 'react';
import Canvas from './_components/canvas';
import PathText from './_components/pathText/pathText';
import Head from 'next/head';
import ColorPicker from './_components/colorPicker';
import { RGBColor } from 'react-color';
import PathEditor from './_components/pathText/pathTextEditor';
import { Point } from 'svg-path-properties/dist/types/types';
import TextAlignmentEdit from './_components/textAlignment';
import { Select, MenuItem, SelectChangeEvent, FormControl} from '@mui/material';
import {TextField, Button, InputLabel} from '@mui/material';
const FONTS = ['Times New Roman','Georgia','Garamond','Arial','Verdana','Helvetica','Courier New','Lucida Console','Monaco','Brush Script Mj','Lucida Handwriting','Copperplate','Papyrus','Tangerine']

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

  type Item = {
    value: number;
    label: string;
  };

  const generateTextSizeItems = (items: Item[]) => {
    return items.map((item, index) => (
        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
    ));
  };

  const generateFontItems = (fonts: string[]) => {
    return fonts.map((item, index) => (
      <MenuItem key={index} value={item}>{item}</MenuItem>
    ));
  };

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
          <FormControl className='form-control'>
            <TextField
              id="outlined-text"
              label="Text"
              defaultValue={text}
              onChange={handleTextChange}
            />
          </FormControl>

          <div className="alignment-color-container">
            <FormControl className='alignment-form-control'>
              {
                TextAlignmentEdit(textAlignment, handleAlignmentChange)
              }
            </FormControl>
            <ColorPicker label="Color" color={color} onChange={handleColorChange}/>
          </div>

          <FormControl className='form-control'>
            <InputLabel id="text-size-select-label">Size</InputLabel>
            <Select
              labelId="text-size-select"
              label="Size"
              id="text-size-select"
              value={textSizePx}
              onChange={handleTextSizeChange} >
              {
                generateTextSizeItems([{value: 20,label:"Small"},
                                    {value: 30,label:"Medium"},
                                    {value: 40,label:"Large"},])
              }
            </Select>
          </FormControl>
          <FormControl className='form-control'>
            <InputLabel id="font-select-label">Font</InputLabel>
            <Select
              labelId="font-select"
              id="text-select"
              value={font}
              label="Font"
              onChange={handleFontChange}>
              { generateFontItems(FONTS) }
            </Select>
          </FormControl>
          <FormControl className='form-control'>
            <Button variant="outlined" onClick={handleEditPathChange}>{editPath ? "Stop Edit Path" : "Edit Path"}</Button>
          </FormControl>

        </div>
      </div>
    </main>
  )
}

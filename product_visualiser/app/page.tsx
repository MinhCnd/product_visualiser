'use client'
import React, { useState } from 'react';
import Canvas from './_components/canvas';
import Form from './_components/form';
import PathText from './_components/pathText/pathText';
import Select from './_components/select';
import Head from 'next/head';
import ColorPicker from './_components/colorPicker';
import { RGBColor } from 'react-color';
import PathEditor from './_components/pathText/pathTextEditor';
import { Point } from 'svg-path-properties/dist/types/types';

const FONTS = ['Times New Roman','Georgia','Garamond','Arial','Verdana','Helvetica','Courier New','Lucida Console','Monaco','Brush Script Mj','Lucida Handwriting','Copperplate','Papyrus','Tangerine']

export default function Home() {

  const [text, setText] = useState('');
  const [font, setFont] = useState('');
  const [color, setColor] = useState({ r: 241, g: 112, b: 19, a: 1} as RGBColor);
  const [editPath, setEditPath] = useState(false);
  const [pathStart, setPathStart] = useState<Point>({x: 120, y: 250});
  const [pathEnd, setPathEnd] = useState<Point>({x:310, y:170});

  const handleTextChange = (newValue: string) => {
    setText(newValue);
  };

  const handleFontChange = (newFont: string) => {
    setFont(newFont);
  }

  const handleColorChange = (newColor: RGBColor) => {
    setColor(newColor);
  }

  const handleEditPathChange = () => {
    setEditPath(!editPath);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>My page title</title>
      </Head>
      <div className='main-container'>
        <div className='view-container'>
          <div className='canvas-container'>
          <Canvas width={400} height={400} imageSrc='/journal.jpeg' text=''/>
          </div>
          <PathText width={400} height={400} text={text} font={font} color={color} pathStart={pathStart} pathEnd={pathEnd}/>
          <PathEditor width={400} height={400} pathStart={pathStart} pathEnd={pathEnd} onPathStartChange={setPathStart} onPathEndChange={setPathEnd} editMode={editPath}></PathEditor>
        </div>
        <div className="editor-container">
          <Form label="Text" value={text} onChange={handleTextChange}/>
          <ColorPicker label="Color" onChange={handleColorChange}/>
          <Select label="Font" default={font} options={FONTS} onChange={handleFontChange}/>
          <button type='button' className="editButton" onClick={handleEditPathChange}>{editPath ? "Stop Edit Path" : "Edit Path"}</button>
        </div>
      </div>
    </main>
  )
}

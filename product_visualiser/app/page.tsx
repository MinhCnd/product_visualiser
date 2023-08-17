'use client'
import React, { useState } from 'react';
import Canvas from './_components/canvas';
import Form from './_components/form';
import Text from './_components/text';
import Select from './_components/select';
import Head from 'next/head';
import ColorPicker from './_components/colorPicker';
import { RGBColor } from 'react-color';

const FONTS = ['Times New Roman','Georgia','Garamond','Arial','Verdana','Helvetica','Courier New','Lucida Console','Monaco','Brush Script Mj','Lucida Handwriting','Copperplate','Papyrus','Tangerine']

export default function Home() {

  const [text, setText] = useState('');
  const [font, setFont] = useState('');
  const [color, setColor] = useState({ r: 241, g: 112, b: 19, a: 1} as RGBColor);

  const handleTextChange = (newValue: string) => {
    setText(newValue);
  };

  const handleFontChange = (newFont: string) => {
    setFont(newFont);
    console.log(`checking 12px ${newFont}`);
    console.log(document.fonts.check(`12px ${newFont}`));
  }

  const handleColorChange = (newColor: RGBColor) => {
    setColor(newColor);
  }

  const handleOnClick = () => {
    console.log('click');
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
          <div className='text-container'>
            <svg width={400} height={400}>
            <path
              id="MyPath"
              stroke='red'
              d="M120,250 310,170"
              onClick={handleOnClick}/>
              <Text x={150} y={250} text={text} font={font} color={color} path='#MyPath'/>
            </svg>
          </div>
        </div>
        <div className="editor-container">
          <Form label="Text" value={text} onChange={handleTextChange}/>
          <ColorPicker label="Color" onChange={handleColorChange}/>
          <Select label="Font" default={font} options={FONTS} onChange={handleFontChange}/>
        </div>
      </div>
    </main>
  )
}

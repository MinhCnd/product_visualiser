'use client'
import React, { useEffect, useState } from 'react';
import Canvas from './_components/canvas';
import PathText from './_components/textConfig/pathText/pathText';
import { RGBColor } from 'react-color';
import PathEditor from './_components/textConfig/pathText/pathTextEditor';
import { Point } from 'svg-path-properties/dist/types/types';
import {SelectChangeEvent} from '@mui/material';
import TextConfig, { textConfig } from './_components/data/textConfig';
import firebaseService from './_components/data/database';

export default function Home() {

  const [pathStart, setPathStart] = useState<Point>({x: 120, y: 250});
  const [pathEnd, setPathEnd] = useState<Point>({x:310, y:170});

  const [textConfig, setTextConfig] = useState<textConfig>({text:'', alignment:'left', size:30, font:'Times New Roman', color:{a:1,r:0,g:0,b:0}, editPath: false});

  const TEXT_CONFIG_ID = '01';


  useEffect(() => {
    //Update with initial value & also listen for further changes
    firebaseService.subscribe(`textConfig/${TEXT_CONFIG_ID}`,setTextConfig);
    return () => {
      //Cleanup function to be run when component removed from DOM
      firebaseService.unsubscribe(`textConfig/${TEXT_CONFIG_ID}`);
    }
  },[]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempConfig = textConfig;
    tempConfig.text = event.target.value;
    firebaseService.updateConfig(TEXT_CONFIG_ID, tempConfig);
  };

  const handleAlignmentChange = (newAlignment: string) => {
    const tempConfig = textConfig;
    tempConfig.alignment = newAlignment;
    firebaseService.updateConfig(TEXT_CONFIG_ID, tempConfig);
  }

  const handleTextSizeChange = (event: SelectChangeEvent<number>) => {
    const tempConfig = textConfig;
    tempConfig.size = parseInt(event.target.value.toString());
    firebaseService.updateConfig(TEXT_CONFIG_ID, tempConfig);
  }

  const handleFontChange = (event: SelectChangeEvent<string>) => {
    const tempConfig = textConfig;
    tempConfig.font = event.target.value;
    firebaseService.updateConfig(TEXT_CONFIG_ID, tempConfig);
  }

  const handleColorChange = (newColor: RGBColor) => {
    const tempConfig = textConfig;
    tempConfig.color = newColor;
    firebaseService.updateConfig(TEXT_CONFIG_ID, tempConfig);
  }

  const handleEditPathChange = () => {
    const tempConfig = textConfig;
    tempConfig.editPath = !tempConfig.editPath;
    firebaseService.updateConfig(TEXT_CONFIG_ID, tempConfig);
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
            text={textConfig.text}
            textSizePx={textConfig.size}
            textAnchor={textConfig.alignment}
            font={textConfig.font} color={textConfig.color}
            pathStart={pathStart}
            pathEnd={pathEnd}
            pathLength={getPathLength(pathEnd, pathStart)}
            />
          <PathEditor width={500} height={500} pathStart={pathStart} pathEnd={pathEnd} onPathStartChange={setPathStart} onPathEndChange={setPathEnd} editMode={textConfig.editPath}></PathEditor>
        </div>
        <div className="editor-container">
          <TextConfig text={textConfig.text} alignment={textConfig.alignment} size={textConfig.size} font={textConfig.font} color={textConfig.color} editPath={textConfig.editPath}
          handleTextChange={handleTextChange} handleAlignmentChange={handleAlignmentChange} handleColorChange={handleColorChange}
          handleEditPathChange={handleEditPathChange} handleFontChange={handleFontChange} handleTextSizeChange={handleTextSizeChange}/>
        </div>
      </div>
    </main>
  )
}

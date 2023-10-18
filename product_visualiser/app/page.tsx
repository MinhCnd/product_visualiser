'use client'
import React, { useEffect, useState } from 'react';
import Canvas from './_components/canvas';
import { RGBColor } from 'react-color';
import { Point } from 'svg-path-properties/dist/types/types';
import {SelectChangeEvent} from '@mui/material';
import ConfigEditor, { Config } from './_components/data/Config';
import firebaseService from './_components/data/database';
import ResizableRect from "./_components/rect/ResizableRect";
import getResizableRectProps from "./hook/getResizableRectProps";

export default function Home() {

  const [pathStart, setPathStart] = useState<Point>({x: 120, y: 250});
  const [pathEnd, setPathEnd] = useState<Point>({x:310, y:170});

  const [fontSizeValue, setFontSizeValue] = useState<string>('0')
  const TEXT_CONFIG_ID = '01';
  const [imageSrc, setImageSrc] = useState<string>("");

  const [textConfig, setTextConfig] = useState<Config>({  width: 0,
    height: 0,
    top: 0,
    left: 0,
    rotateAngleRad: 0,
    text: '',
    imageSrc: '',
    alignment: '',
    size: 0,
    font: 'Times New Roman',
    color: {a:1,r:0,g:0,b:0},
    editPath: false});

  const [imageConfig, setImageConfig] = useState<Config>({  width: 0,
    height: 0,
    top: 0,
    left: 0,
    rotateAngleRad: 0,
    text: '',
    imageSrc: '',
    alignment: '',
    size: 0,
    font: 'Times New Roman',
    color: {a:1,r:0,g:0,b:0},
    editPath: false});

  useEffect(() => {
    //Update with initial value & also listen for further changes
    firebaseService.subscribe(`config/01`, setTextConfig);
    firebaseService.subscribe(`config/02`, setImageConfig);
    return () => {
      //Cleanup function to be run when component removed from DOM
      firebaseService.unsubscribe(`config/01`);
      firebaseService.unsubscribe(`config/02`);
    }
  },[]);

  const textRectProps = getResizableRectProps({config: textConfig, configId: `01`, firebaseService});
  const imageRectProps = getResizableRectProps({config: imageConfig, configId: `02`, firebaseService});

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

  const getDisplayTextFontSize = (ele: HTMLElement) => {
    if (ele && ele.className === 'text') {
      ele.style?.fontSize && setFontSizeValue(ele.style?.fontSize);
    }
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
          {imageSrc && (
            <ResizableRect
              parentRotateAngle={0}
              rotatable={true}
              aspectRatio={0}
              {...{
                top: imageRectProps.config.top,
                left: imageRectProps.config.left,
                width: imageRectProps.config.width,
                height: imageRectProps.config.height,
                rotateAngle: imageRectProps.config.rotateAngleRad,
                editing: textConfig.editPath,
                minWidth: -Infinity,
                minHeight: -Infinity,
                zoomable: "nw,ne,sw,se",
                onRotate: imageRectProps.handleRotate,
                onResize: imageRectProps.handleResize,
                onDragStart: imageRectProps.onDragStart,
                onDrag: imageRectProps.handleDrag,
                imageSrc: imageSrc,
              }}
            />
          )}
          <ResizableRect
            parentRotateAngle={0}
            rotatable={true}
            aspectRatio={0}
            {...{
              top: textRectProps.config.top,
              left: textRectProps.config.left,
              width: textRectProps.config.width,
              height: textRectProps.config.height,
              rotateAngle: textRectProps.config.rotateAngleRad,
              editing: textConfig.editPath,
              minWidth: -Infinity,
              minHeight: -Infinity,
              zoomable: "nw,ne,sw,se",
              text: textConfig.text,
              textColor: textConfig.color,
              textAlign: textConfig.alignment,
              font: textConfig.font,
              onRotate: textRectProps.handleRotate,
              onResize: textRectProps.handleResize,
              onDragStart: textRectProps.onDragStart,
              onDrag: textRectProps.handleDrag,
              displayFontSize: getDisplayTextFontSize
            }}
          />
        </div>
        <div className="editor-container">
          <ConfigEditor text={textConfig.text} alignment={textConfig.alignment} size={textConfig.size} font={textConfig.font} color={textConfig.color} editPath={textConfig.editPath}
            width={textRectProps.config.width}
            height={textRectProps.config.width}
            top={textRectProps.config.top}
            left={textRectProps.config.left}
            rotateAngleRad={textRectProps.config.rotateAngleRad}
            imageSrc={``}
            handleImageSourceChange={()=>{}}
            handleDrag={()=>{}}
            handleResize={()=>{}}
            handleRotate={()=>{}}
          handleTextChange={handleTextChange} handleAlignmentChange={handleAlignmentChange} handleColorChange={handleColorChange}
          handleEditPathChange={handleEditPathChange} handleFontChange={handleFontChange}/>
        </div>
      </div>
    </main>
  )
}

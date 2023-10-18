import React, { useState, useEffect } from "react";
import firebaseService from '../_components/data/database';
import { Config } from "../_components/data/Config";
import {SelectChangeEvent} from '@mui/material';
import { RGBColor } from 'react-color';

interface Resizableprops {
  config: Config;
  configId: string;
  firebaseService: any;
}

const getResizableRectProps = (props: Resizableprops) => {

  const config = props.config

  let dragStartX = 0
  let dragStartY = 0

  const handleResize = (point: {
    top: number;
    left: number;
    width: number;
    height: number;
  }) => {
    const { top, left, width, height } = point;
    if (
      top >= 0 &&
      top <= 500 &&
      left >= 0 &&
      left <= 500 &&
      width > 0 &&
      width + left <= 500 &&
      height > 0 &&
      height + top <= 500
    ) {
      const tempConfig = props.config;
      tempConfig.top = top;
      tempConfig.left = left;
      tempConfig.width = width;
      tempConfig.height = height;
      firebaseService.updateConfig(props.configId, tempConfig);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempConfig = props.config;
    tempConfig.text = event.target.value;
    firebaseService.updateConfig(props.configId, tempConfig);
  };

  const handleAlignmentChange = (newAlignment: string) => {
    const tempConfig = props.config;
    tempConfig.alignment = newAlignment;
    firebaseService.updateConfig(props.configId, tempConfig);
  }

  const handleTextSizeChange = (event: SelectChangeEvent<number>) => {
    const tempConfig = props.config;
    tempConfig.size = parseInt(event.target.value.toString());
    firebaseService.updateConfig(props.configId, tempConfig);
  }

  const handleFontChange = (event: SelectChangeEvent<string>) => {
    const tempConfig = props.config;
    tempConfig.font = event.target.value;
    firebaseService.updateConfig(props.configId, tempConfig);
  }

  const handleColorChange = (newColor: RGBColor) => {
    const tempConfig = props.config;
    tempConfig.color = newColor;
    firebaseService.updateConfig(props.configId, tempConfig);
  }

  const handleImageSourceChange = (newSource: string) => {
    const tempConfig = props.config;
    tempConfig.imageSrc = newSource;
    firebaseService.updateConfig(props.configId, tempConfig);
  }

  const handleEditPathChange = () => {
    const tempConfig = props.config;
    tempConfig.editPath = !tempConfig.editPath;
    firebaseService.updateConfig(props.configId, tempConfig);
  }

  const handleRotate = (rotateAngle: number) => {
    const tempConfig = props.config;
    tempConfig.rotateAngleRad = rotateAngle;
    firebaseService.updateConfig(props.configId, tempConfig);
  };

  const rotatePointCCW = (rotateAngleDeg: number, point: any) => {
    const rotateAngleRad = rotateAngleDeg * Math.PI / 180;
    const x = Math.cos(rotateAngleRad) * point.x - Math.sin(rotateAngleRad)*point.y;
    const y = Math.sin(rotateAngleRad) * point.x + Math.cos(rotateAngleRad)*point.y;
    return {x, y}
  }

  const onDragStart = () => {
    dragStartX = config.left
    dragStartY = config.top
  }

  const handleDrag = (deltaX: number, deltaY: number) => {
    
    const config = props.config;

    const center_to_tl = {x: -config.width/2, y: -config.height/2}
    const center_to_tr = {x: config.width/2, y: -config.height/2}
    const center_to_bl = {x: -config.width/2, y: config.height/2}
    const center_to_br = {x: config.width/2, y: config.height/2}

    const center_new = {x: dragStartX + deltaX + config.width/2, y: dragStartY + deltaY + config.height/2}
    
    const center_to_tl_rotated = rotatePointCCW(config.rotateAngleRad, center_to_tl);
    const center_to_tr_rotated = rotatePointCCW(config.rotateAngleRad, center_to_tr);
    const center_to_bl_rotated = rotatePointCCW(config.rotateAngleRad, center_to_bl);
    const center_to_br_rotated = rotatePointCCW(config.rotateAngleRad, center_to_br);
    
    const origin_to_tl_new = {x: center_new.x + center_to_tl_rotated.x, y: center_new.y + center_to_tl_rotated.y}
    const origin_to_tr_new = {x: center_new.x + center_to_tr_rotated.x, y: center_new.y + center_to_tr_rotated.y}
    const origin_to_bl_new = {x: center_new.x + center_to_bl_rotated.x, y: center_new.y + center_to_bl_rotated.y}
    const origin_to_br_new =  {x: center_new.x + center_to_br_rotated.x, y: center_new.y + center_to_br_rotated.y}

    const min_X = Math.min(origin_to_tl_new.x, origin_to_tr_new.x, origin_to_bl_new.x, origin_to_br_new.x);
    const min_Y = Math.min(origin_to_tl_new.y, origin_to_tr_new.y, origin_to_bl_new.y, origin_to_br_new.y);
    const max_X = Math.max(origin_to_tl_new.x, origin_to_tr_new.x, origin_to_bl_new.x, origin_to_br_new.x);
    const max_Y = Math.max(origin_to_tl_new.y, origin_to_tr_new.y, origin_to_bl_new.y, origin_to_br_new.y);

    console.log(`min_X=${min_X},min_Y=${min_Y},max_X=${max_X},max_Y=${max_Y}`)
    
    if ( min_X >= 0 && max_X <= 500 && min_Y >= 0 && max_Y <= 500) {
      const tempConfig = config;
      tempConfig.left = dragStartX + deltaX;
      tempConfig.top = dragStartY + deltaY;
      firebaseService.updateConfig(props.configId, tempConfig);
    }
  };
  return {
    config,
    onDragStart,
    handleDrag,
    handleResize,
    handleRotate,
    handleTextChange,
    handleTextSizeChange,
    handleColorChange,
    handleFontChange,
    handleAlignmentChange
  };
};
export default getResizableRectProps;

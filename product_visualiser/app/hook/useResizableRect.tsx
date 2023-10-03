import React, { useState, useEffect } from "react";

interface Resizableprops {
  dfwidth: number;
  dfheight: number;
  dftop: number;
  dfleft: number;
  dfrotateAngle: number;
}
const useResizableRect = (props: Resizableprops) => {
  const { dfwidth, dfheight, dfleft, dftop, dfrotateAngle } = props;
  const [width, setWidth] = useState(dfwidth);
  const [height, setHeight] = useState(dfheight);

  const [top, setTop] = useState(dftop);

  const [left, setLeft] = useState(dfleft);

  const [rotateAngle, setRotateAngle] = useState(dfrotateAngle);

  const handleResize = (point: {
    top: number;
    left: number;
    width: number;
    height: number;
  }) => {
    const { top, left, width, height } = point;
    console.log(top, left, width, height);
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
      setTop(Math.round(top));
      setLeft(Math.round(left));
      setWidth(Math.round(width));
      setHeight(Math.round(height));
    }
  };

  const handleRotate = (rotateAngle: number) => {
    setRotateAngle(rotateAngle);
  };

  const rotatePointCCW = (rotateAngleDeg: number, point: any) => {
    const rotateAngleRad = rotateAngleDeg * Math.PI / 180;
    const x = Math.cos(rotateAngleRad) * point.x - Math.sin(rotateAngleRad)*point.y;
    const y = Math.sin(rotateAngleRad) * point.x + Math.cos(rotateAngleRad)*point.y;
    return {x, y}
  }
  const handleDrag = (deltaX: number, deltaY: number) => {
    const tl_center = {x: -width/2, y: -height/2}
    const tr_center = {x: width/2, y: -height/2}
    const bl_center = {x: -width/2, y: height/2}
    const br_center = {x: width/2, y: height/2}

    const center = {x: left + width/2, y: top + height/2}
    
    const tl_center_rotated = rotatePointCCW(rotateAngle, tl_center);
    const tr_center_rotated = rotatePointCCW(rotateAngle, tr_center);
    const bl_center_rotated = rotatePointCCW(rotateAngle, bl_center);
    const br_center_rotated = rotatePointCCW(rotateAngle, br_center);
    
    const tl_new = {x: tl_center_rotated.x + center.x + deltaX, y: tl_center_rotated.y + center.y + deltaY}
    const tr_new = {x: tr_center_rotated.x + center.x + deltaX, y: tr_center_rotated.y + center.y + deltaY}
    const bl_new = {x: bl_center_rotated.x + center.x + deltaX, y: bl_center_rotated.y + center.y + deltaY}
    const br_new =  {x: br_center_rotated.x + center.x + deltaX, y: br_center_rotated.y + center.y + deltaY}

    const min_X = Math.min(tl_new.x, tr_new.x, bl_new.x, br_new.x);
    const min_Y = Math.min(tl_new.y, tr_new.y, bl_new.y, br_new.y);
    const max_X = Math.max(tl_new.x, tr_new.x, bl_new.x, br_new.x);
    const max_Y = Math.max(tl_new.y, tr_new.y, bl_new.y, br_new.y);
    
    if ( min_X >= 0 && max_X <= 500 && min_Y >= 0 && max_Y <= 500) {
      setLeft(left + deltaX);
      setTop(top + deltaY);
    }
  };
  return {
    width,
    height,
    top,
    left,
    rotateAngle,
    handleDrag,
    handleResize,
    handleRotate,
  };
};
export default useResizableRect;

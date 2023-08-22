'use strict'

import reactCSS from 'reactcss'
import { RGBColor, SketchPicker, ColorResult } from 'react-color'
import { useState } from 'react';
import React from 'react';
import styles from './styles/colorPicker.module.css';
import { Button } from '@mui/material';

interface ColorPickerProps {
  label: string,
  color: RGBColor,
  onChange: (color: RGBColor) => void;
}

export default function ColorPicker(props: ColorPickerProps) {

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  function handleClick() {
    setDisplayColorPicker(!displayColorPicker);
  }

  function handleClose() {
    setDisplayColorPicker(false);
  }

  function handleChange(color: ColorResult) {
    props.onChange(color.rgb);
  }

  const _styles = reactCSS({
    'default': {
      color: {
        width: '30px',
        height: '30px',
        borderRadius: '2px',
        background: `rgba(${ props.color.r }, ${ props.color.g }, ${ props.color.b }, ${ props.color.a })`,
      } as React.CSSProperties,
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      } as React.CSSProperties,
      popover: {
        position: 'absolute',
        zIndex: '2',
      } as React.CSSProperties,
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      } as React.CSSProperties,
    },
  });

  return (
    <div className={styles.colorPicker}>
      <div style={ _styles.swatch } onClick={ handleClick }>
        <div style={ _styles.color } />
      </div>
      { displayColorPicker ? <div style={ _styles.popover }>
        <div style={ _styles.cover } onClick={ handleClose }/>
        <SketchPicker color={ props.color } onChange={ handleChange } />
      </div> : null }
    </div>
  )

}

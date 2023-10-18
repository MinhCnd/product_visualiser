import React from 'react';
import ColorPicker from '../colorPicker';
import TextAlignmentEdit from '../textAlignment';
import { Select, MenuItem, FormControl} from '@mui/material';
import {TextField, Button, InputLabel} from '@mui/material';
import { RGBColor } from 'react-color';
import styles from '../styles/Config.module.css';

const FONTS = ['Times New Roman','Georgia','Garamond','Arial','Verdana','Helvetica','Courier New','Lucida Console','Monaco','Brush Script Mj','Lucida Handwriting','Copperplate','Papyrus','Tangerine']

export interface Config {
  width: number,
  height: number,
  top: number,
  left: number,
  rotateAngleRad: number,
  text: string,
  imageSrc: string,
  alignment: string,
  size: number,
  font: string,
  color: RGBColor,
  editPath: boolean
}

export interface ConfigProps extends Config{
  handleTextChange: any,
  handleImageSourceChange: any
  handleAlignmentChange: any,
  handleColorChange: any,
  handleFontChange: any,
  handleDrag: any,
  handleResize: any,
  handleRotate: any,
  handleEditPathChange: any
}

export default function ConfigEditor(props: ConfigProps) {

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

  return (
    <div className={styles.textConfigContainer}>
      <FormControl className={styles.formControl}>
            <TextField
              id="outlined-text"
              label="Text"
              defaultValue={props.text}
              onChange={props.handleTextChange}
            />
          </FormControl>

          <div className={styles.alignmentColorContainer}>
            <FormControl className={styles.alignmentFormControl}>
              {
                TextAlignmentEdit(props.alignment, props.handleAlignmentChange)
              }
            </FormControl>
            <ColorPicker label="Color" color={props.color} onChange={props.handleColorChange}/>
          </div>

          <FormControl className={styles.formControl}>
            <InputLabel id="font-select-label">Font</InputLabel>
            <Select
              labelId="font-select"
              id="text-select"
              value={props.font}
              label="Font"
              onChange={props.handleFontChange}>
              { generateFontItems(FONTS) }
            </Select>
          </FormControl>
          <FormControl className={styles.formControl}>
            <Button variant="outlined" onClick={props.handleEditPathChange}>{props.editPath ? "Stop Edit Path" : "Edit Path"}</Button>
          </FormControl>
    </div>
  )
}

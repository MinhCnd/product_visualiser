import React from 'react';
import ColorPicker from '../colorPicker';
import TextAlignmentEdit from '../textAlignment';
import { Select, MenuItem, FormControl} from '@mui/material';
import {TextField, Button, InputLabel} from '@mui/material';
import { RGBColor } from 'react-color';
import styles from '../styles/textConfig.module.css';

const FONTS = ['Times New Roman','Georgia','Garamond','Arial','Verdana','Helvetica','Courier New','Lucida Console','Monaco','Brush Script Mj','Lucida Handwriting','Copperplate','Papyrus','Tangerine']

export interface textConfig {
  text: string,
  alignment: string,
  size: number,
  font: string,
  color: RGBColor,
  editPath: boolean
}

export interface TextConfigProps extends textConfig{
  handleTextChange: any,
  handleAlignmentChange: any,
  handleColorChange: any,
  handleTextSizeChange: any,
  handleFontChange: any,
  handleEditPathChange: any
}

export default function TextConfig(props: TextConfigProps) {

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
            <InputLabel id="text-size-select-label">Size</InputLabel>
            <Select
              labelId="text-size-select"
              label="Size"
              id="text-size-select"
              value={props.size}
              onChange={props.handleTextSizeChange} >
              {
                generateTextSizeItems([{value: 20,label:"Small"},
                                    {value: 30,label:"Medium"},
                                    {value: 40,label:"Large"},])
              }
            </Select>
          </FormControl>
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

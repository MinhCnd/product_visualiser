import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export default function TextAnchorEdit(anchor: string, OnAnchorChange: (newAnchor: string) => void) {

  const handleAnchorChange = (
    _: React.MouseEvent<HTMLElement>,
    newAnchor: string | null,
  ) => {
    if(newAnchor) {
      OnAnchorChange(newAnchor);
    }
  };

  return (
    <ToggleButtonGroup
      value={anchor}
      exclusive
      onChange={handleAnchorChange}
      aria-label="text anchor"
    >
      <ToggleButton value="start" aria-label="start">
        <FormatAlignLeftIcon />
      </ToggleButton>
      <ToggleButton value="middle" aria-label="middle">
        <FormatAlignCenterIcon />
      </ToggleButton>
      <ToggleButton value="end" aria-label="end">
        <FormatAlignRightIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

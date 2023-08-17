import React, { useState } from 'react';

interface selectProps {
  label: string;
  default: string;
  options: string[];
  onChange: (newValue: string) => void;
}

export default function Select(props: selectProps) {
  const [selectedOption, setSelectedOption] = useState(props.default);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFont = event.target.value;
    setSelectedOption(newFont);
    props.onChange(newFont);
  };

  return (
    <div className='select-container'>
      <label htmlFor="dropdown">{props.label}</label>
      <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

import React from 'react';

interface FormProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

export default function TextBox({ label, value, onChange }: FormProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div className="form-container">
      <label className="label">{label}</label>
      <input
        className="input"
        type="text"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

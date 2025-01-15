import React, { useState } from 'react';

function ExpandableDropdown({ className }) {
  const [options, setOptions] = useState(['Option 1', 'Option 2']);
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddOption = () => {
    if (inputValue) {
      setOptions([...options, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className={className}>
      <select value={selectedOption} onChange={handleOptionChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddOption}>Add</button>
    </div>
  );
}

export default ExpandableDropdown;

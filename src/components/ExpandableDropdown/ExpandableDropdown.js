import React, { useState } from 'react';

function ExpandableDropdown() {
    const [options, setOptions] = useState(['Option 1', 'Option 2']);
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionChange = (event) => {
        // Handle selected option change
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
        <div>
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
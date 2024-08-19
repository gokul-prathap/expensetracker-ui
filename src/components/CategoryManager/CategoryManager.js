import React, { useState } from 'react';

function CategoryManager({className}) {
  const [categories, setCategories] = useState(['Initial Category']); // Initialize with an example category

  const handleAddCategory = () => {
    setCategories([...categories, '']);
  };

  const handleCategoryChange = (index, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = value;
    setCategories(updatedCategories);
  };

  return (
    <div className={className}>
      {categories.map((category, index) => (
        <div key={index}>
          <input
            type="text"
            value={category}
            onChange={(e) => handleCategoryChange(index, e.target.value)}
          />
          {index === categories.length - 1 && (
            <button onClick={handleAddCategory}>+</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default CategoryManager;

import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="spinner-container">
      <ClipLoader color="#123abc" loading={loading} size={150} />
    </div>
  );
};

export default Spinner;

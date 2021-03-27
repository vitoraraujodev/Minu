import React, { useState } from 'react';

import './styles.css';

export default function Tables() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="tables">
      {loading && (
        <div className="loader-container">
          <div className="loader" />
        </div>
      )}
    </div>
  );
}

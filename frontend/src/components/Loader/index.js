import React from 'react';

import './styles.css';

export default function Loader({
  size = 24,
  color = '#535bfe',
  background = '#f2f2f2',
}) {
  function handleLoaderStyles() {
    const thickness = size * 0.2;

    return {
      height: size,
      width: size,
      border: `${thickness}px solid ${background}`,
      borderTop: `${thickness}px solid ${color}`,
    };
  }

  return (
    <div id="loader-container" styles={{ height: size, width: size }}>
      <div className="loader" style={handleLoaderStyles()} />
    </div>
  );
}

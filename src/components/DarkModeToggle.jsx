import React from 'react';

const DarkModeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      className="dark-mode-toggle"
      onClick={onToggle}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

export default DarkModeToggle;
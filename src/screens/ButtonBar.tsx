import React from 'react';

// Define the type for a single button
interface Button {
  label: string;
  colorClass: string;
  onClick: () => void;
}

// Define the props for the ButtonBar component
interface ButtonBarProps {
  buttons: Button[];
}

const ButtonBar: React.FC<ButtonBarProps> = ({ buttons }) => {
  return (
    <div className="flex gap-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className={`px-3   text-white rounded-lg transition ${button.colorClass}`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonBar;

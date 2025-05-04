import React, { ReactNode, CSSProperties } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ children, className, onClick, style }) => {
  return (
    <button className={className} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default Button;
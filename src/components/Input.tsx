import React, { ReactNode, ChangeEvent } from 'react';
import './input.css';

interface InputTextProps {
  placeholder?: string;
  value: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const InputText: React.FC<InputTextProps> = ({ placeholder, value, label, onChange, className }) => {
  return (
    <>
      <label>{label}</label>
      <input
        type="text"
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ width: "100%" }}
      />
    </>
  );
};

interface InputPasswordProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  type?: string;
  className?: string;
}

export const InputPassword: React.FC<InputPasswordProps> = ({ label, value, onChange, children, type = "password", className }) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        type={type}
        className={className}
        value={value}
        onChange={onChange}
        style={{ width: "85%" }}
      />
      {children}
    </div>
  );
};

interface InputSelectProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: string[];
  className?: string;
}

export const InputSelect: React.FC<InputSelectProps> = ({ onChange, label, options, className }) => {
  return (
    <>
      <label>{label}</label>
      <select className={className} style={{ width: "100%" }} onChange={onChange}>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
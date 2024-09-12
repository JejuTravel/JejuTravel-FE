import React from 'react';
import '../assets/styles/Input.css';

const Input = ({ type = 'text', placeholder = '', value, onChange, name, className = '' }) => {
    return (
        <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`custom-input ${className}`}
        />
    );
};

export default Input;

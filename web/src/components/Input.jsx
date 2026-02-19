import React from 'react';

const Input = ({
    label,
    id,
    type = 'text',
    error,
    className = '',
    ...props
}) => {
    const inputId = id || props.name;

    return (
        <div className={`form-group ${className}`} style={{ marginBottom: '1rem' }}>
            {label && (
                <label
                    htmlFor={inputId}
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                type={type}
                {...props}
            />
            {error && (
                <span style={{ color: 'var(--expired)', fontSize: '0.875rem' }}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default Input;

import React from 'react';

const Input = ({ type = 'text', label, ...props }) => (
    <div className="input">
        <label>
            {props.label}
            <input type={type} {...props} />
        </label>
    </div>
);

export default Input;

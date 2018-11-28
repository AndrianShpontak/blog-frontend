import React from 'react';

const Button = ({ onButtonClick, buttonText, ...rest }) => (
    <button onClick={onButtonClick} {...rest} >
        {buttonText}
    </button>
);

export default Button;

import React from 'react';

const Button = (props) => (
    <button onClick={props.onButtonClick} disabled={props.disabled}>
        {props.buttonText}
    </button>
);

export default Button;

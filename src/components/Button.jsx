import React from 'react';

const Button = (props) => (
    <button onClick={props.onButtonClick}>
        {props.buttonText}
    </button>
);

export default Button;
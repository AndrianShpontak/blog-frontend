import React from 'react';

const Input = (props) => (
    <div>
        <label>
            {props.label}
            <input type={props.type} value={props.value} onChange={props.onChange}/>
        </label>
    </div>
);

export default Input;
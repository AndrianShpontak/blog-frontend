import React from 'react';

const Input = (props) => (
    <div className="input">
        <label>
            {props.label}
            <input type={props.type || 'text'} value={props.value} onChange={props.onChange}/>
        </label>
    </div>
);

export default Input;
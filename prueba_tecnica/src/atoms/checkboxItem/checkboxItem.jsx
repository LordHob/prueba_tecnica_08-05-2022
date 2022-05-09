import React from 'react';
import './checkboxItem.css';

const CheckboxItem = (props) =>{

    return(
        <div className="checkbox_item">
            <input type="checkbox" className='input_checkbox' name={props.filter} id={props.filter} onChange={() => props.addFilter(props.filter)}/>
            <label htmlFor={props.filter}>{props.filter}</label>
        </div>
    )
}

export default CheckboxItem;
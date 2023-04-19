import React from 'react';
import "./Dropdown.css"
function Dropdown(props) {

        const dropdownItems = props.data.map((item) => { 
            return (
                  <option value={item.value} key={item.value}>{item.label}</option>
            );
        })

    return (
        <div>
            <select
                  name={props.name}
                  id="dropdown"
                  onChange={props.handleChange}
                >
                  <option value={0}>Одбери</option>
                  {dropdownItems}
                </select>
        </div>
    );
}

export default Dropdown;

import React from 'react'

const CheckBox = ({ label, ...restProps }) => 
    <label className="checkbox">
        <input
            {...restProps}
        />
        <p className="help">{label}</p>
    </label>

export default CheckBox

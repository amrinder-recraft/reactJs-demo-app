import React from 'react'

const Col = ({ children, className, ...restProps }) =>
    <div className={`column ${className || ''}`} {...restProps}>
        {children}
    </div>

export default Col
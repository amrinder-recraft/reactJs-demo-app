import React from 'react'

const Row = ({ children, className, ...restProps }) =>
    <div className={`columns ${className || ''}`} {...restProps}>
        {children}
    </div>

export default Row
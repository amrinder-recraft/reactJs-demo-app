import React from 'react'

const Container = ({ children, className, ...restProps }) =>
    <div className={`container ${className || ''}`} {...restProps}>
        {children}
    </div>

export default Container
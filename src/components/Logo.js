import React from 'react'

import logo from '../assets/logo.png'

const Logo = ({className = '', ...restProps}) =>
    <img className={`logo ${className}`} src={logo} alt="logo" {...restProps}/>

export default Logo
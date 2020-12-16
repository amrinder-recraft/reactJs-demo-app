import React from 'react'

const ErrorHelpText = ({ errors = [] }) =>
    <p className="help is-danger">{errors[0] || ''}</p>

export default ErrorHelpText
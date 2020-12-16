import React from 'react'

import ErrorHelpText from '../Form/ErrorHelpText'

const FieldWithLabel = ({
    children,
    label,
    error = []
}) =>
    <div className="field">
        <label className="label">{label}</label>
        <div className="control">
            {children}
            <ErrorHelpText errors={error} />
        </div>
    </div>

export default FieldWithLabel
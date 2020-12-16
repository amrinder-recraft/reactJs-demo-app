import React from 'react'

const Field = ({
    loading,
    leftIcon,
    inputProps
}) =>
    <div className="field">
        <div className={`control has-icons-left is-large ${loading ? 'is-loading' : ''}`}>
            <input className="input is-large" {...inputProps} />
            {
                leftIcon ?
                    <span className="icon is-large is-left">
                        {leftIcon}
                    </span> :
                    null
            }
        </div>
    </div>

export default Field
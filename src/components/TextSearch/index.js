import React from 'react'

import Field from '../Field'

import { onTextChange } from 'utils/input'

const TextSearch = ({ onChange, searchTerm }) =>
    <div className="search-container">
        <Field
            leftIcon={<i className="fas fa-search"></i>}
            inputProps={{
                placeholder: "Search Jobs",
                value: searchTerm,
                onChange: onTextChange(onChange)
            }}
        />
    </div>

export default TextSearch
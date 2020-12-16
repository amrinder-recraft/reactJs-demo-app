import React from 'react'

import CreatableSelect from 'react-select/lib/Creatable'

const components = {
    DropdownIndicator: null
}

const TagsInput = props =>
    <CreatableSelect
        components={components}
        menuIsOpen={false}
        placeholder="Add tags"
        isClearable
        isMulti
        {...props}
    />

export default TagsInput
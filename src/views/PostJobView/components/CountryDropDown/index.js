import React from 'react'

import { useGetCountries } from '../../../../hooks/location'
import { toOptions } from 'utils/input'

const CountryDropDown = ({ onChange, value, className }) => {
    // fetch countries from API
    const countries = useGetCountries()
    const options = toOptions(countries, {
        value: 'name',
        label: 'name'
    })

    const onSelectChange = e => {
        const selectedOption = options.find(option => option.value === e.target.value)
        if (selectedOption) {
            onChange(selectedOption)
        }
    }

    return (
        <div className="select">
            <select onChange={onSelectChange} value={value.value} className={className}>
                <option value="">Select country</option>
                {
                    options.map(
                        (option, index) =>
                            <option
                                key={index}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                    )
                }
            </select>
        </div>
    )
}

export default CountryDropDown
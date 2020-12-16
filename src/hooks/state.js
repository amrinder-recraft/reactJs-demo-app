import { useState, useEffect } from 'react'
import { apiGetCountries } from 'api/location'

export const useGetCountries = () => {
    const [countries, setCountries] = useState([])
    useEffect(() => {
        apiGetCountries().then(setCountries)
    }, [])

    return countries
}
import axios from 'axios';
import { responseData } from 'utils/common'

export const apiGetCountries = () => 
    axios.get(`https://restcountries.eu/rest/v2/all`)
        .then(responseData)
import axios from 'axios'
import { responseData } from 'utils/common'
import { API_URL } from "constants"

export const apiGetStates = (country, name) =>
    axios.get(`${API_URL}/location?country=${country}&name=${name}`)
    .then(responseData)
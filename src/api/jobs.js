import axios from 'axios'
import { API_URL } from "constants"

import { responseData } from "utils/common"

export const apiSaveJob = jobPost => 
    axios.post(`${API_URL}/jobs`, jobPost)
        .then(responseData)

export const apiGetJobs = data =>
    axios.get(`${API_URL}/jobs`, {
        params: data
    })
    .then(responseData)

export const apiGetJob = jobId =>
    axios.get(`${API_URL}/jobs/${jobId}`)
        .then(responseData)

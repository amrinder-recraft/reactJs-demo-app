import axios from 'axios'
import { API_URL } from "constants"

import { responseData } from "utils/common"

export const apiUploadFile = uploadFile =>
    axios.post(`${API_URL}/upload`, uploadFile)
        .then(responseData)

export const apiApplyJob = applyJobPost =>
    axios.post(`${API_URL}/apply`, applyJobPost)
        .then(responseData)
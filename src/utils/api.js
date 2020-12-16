import axios from 'axios'
import CryptoJS from 'crypto-js'

import { SECURE_KEY, API_URL } from '../constants'

const generateHash = value => CryptoJS.AES.encrypt(value, SECURE_KEY).toString()

const generateApiKey = () => {
    const time = new Date().getTime()
    const api_key = generateHash(time.toString())

    return api_key
}

export const addInterceptors = () => {
    axios.interceptors.request.use(config => {
        const api_key = generateApiKey()

        if (config.url.includes(API_URL)) {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    api_key
                }
            }
        }

        return config
      },
      error => Promise.reject(error)
    )
}
export const API_PROTOCOL = process.env.SCHEME || 'http'
export const API_URL = `${API_PROTOCOL}://${process.env.API_URL}`
export const GOOGLE_TRACKING_ID = 'UA-70116365-13'
export const isProduction = process.env.NODE_ENV === 'production'
export const defaultLimit = 10
export const SECURE_KEY = process.env.SECURE_KEY
export const SENTRY_APP_DSN = 'https://a06a094b03354df79c9f716340a2b534@sentry.io/1436138'
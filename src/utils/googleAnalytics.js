import GoogleAnalytics from "react-ga"
import { GOOGLE_TRACKING_ID, isProduction } from 'constants'

GoogleAnalytics.initialize(GOOGLE_TRACKING_ID)

export const trackPage = (page, options = {}) => {
    if (isProduction) {
        GoogleAnalytics.set({
            page,
            ...options,
        })
        GoogleAnalytics.pageview(page)
    }
}

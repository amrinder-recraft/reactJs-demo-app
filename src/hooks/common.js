import { useState, useEffect } from 'react'
import { mergeState } from 'utils/state'
import { trackPage } from 'utils/googleAnalytics'

export const useMergeState = initValue => {
    const [value, setValue] = useState(initValue)
    const updaterFunction = mergeState(value, setValue)

    return [value, updaterFunction, setValue]
}

export const useChangeTitle = title => {
    useEffect(() => {
        document.title = title
    }, [title])
}

export const useTrackPage = location => {
    useEffect(() => {
        const page = location.pathname + location.search
        trackPage(page)
    }, [location.pathname, location.search])
}

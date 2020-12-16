import { useState, useEffect } from 'react'
import { apiGetJob } from 'api/jobs'
import { convertJobFromPayload } from 'utils/jobs'
import { apiGetJobs } from '../api/jobs'
import { debounce } from '../utils/common'

export const useGetJob = jobId => {
    const [job, setJob] = useState({})
    const [loading, setLoading] = useState(true)
    const [errorMsg, seterrorMsg] = useState('')

    const normaliseAndSetJob = newJob => {
        setJob(convertJobFromPayload(newJob))
        setLoading(false)
    }

    useEffect(() => {
        if (window.SERVER_JOB_DATA && window.SERVER_JOB_DATA._id === jobId) {
            normaliseAndSetJob(window.SERVER_JOB_DATA)

        } else {
            apiGetJob(jobId)
                .then(({ job }) => {
                    normaliseAndSetJob(job)
                }).catch(err => {
                    setLoading(false)
                    let { response } = err
                    let { data = {} } = response
                    let { message = "" } = data
                    seterrorMsg(message)
                })
        }
    }, [])

    return [job, loading, errorMsg]
}

export const useGetJobs = ({ start, limit, searchTerm }) => {
    const [timeoutID, setTimeoutId] = useState(null)
    const [jobsPayload, setJobs] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        let newTimeoutID = debounce(
            () => {
                apiGetJobs({ start, limit, searchTerm }).then(res => {
                    setJobs(res)
                    setLoading(false)
                })
            },
            500,
            timeoutID
        )

        setTimeoutId(newTimeoutID)
    }, [start, limit, searchTerm])

    return [jobsPayload, loading]
}
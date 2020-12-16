import React, { useState, useEffect } from 'react'
import queryString from 'query-string'

import TextSearch from 'components/TextSearch'
import JobList from 'components/Job/JobList'
import Logo from 'components/Logo'
import Row from 'components/Layout/Row'
import Col from 'components/Layout/Col'
import Container from 'components/Layout/Container'
import Loader from 'components/Loader/Loader'
import Pagination from 'components/Pagination/Pagination'

import { useGetJobs } from '../../hooks/jobs'
import { useChangeTitle, useTrackPage } from '../../hooks/common'

import { sortJobs } from 'utils/jobs'

import { defaultLimit } from 'constants'

import GooglePlayBadge from '../../assets/google-play-badge.svg'


const HomeView = ({ location }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [start, setStart] = useState(0)
    const [jobsPayload, loading] = useGetJobs({ start: start, limit: defaultLimit, searchTerm })
    const { jobs = [], total = 0 } = jobsPayload

    const sortedJobs = sortJobs(jobs)

    useChangeTitle('Jobs Buddha | Find Jobs | Post Jobs')
    useTrackPage(location)

    const onChangeSearchTerm = term => {
        setSearchTerm(term)
        setStart(0)
    }

    useEffect(() => {
        const params = queryString.parse(location.search)
        if (params.searchTerm) {
            setSearchTerm(params.searchTerm)
        }
    }, [location.search])

    return (
        <Container className={`${'home__container'}`}>
            <Row className="is-centered">
                <Col className="is-half has-text-centered">
                    <Logo className="is-hidden-touch" />
                        <a className="google-play-badge is-hidden-tablet" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.jobsbuddhamobile&hl=en" target="_blank">
                            <img src={GooglePlayBadge} alt = "GooglePlayStore"/>
                        </a>
                    <p className="tagline has-text-centered is-size-4">Find the best matched Jobs at Jobs Buddha.</p>
                    <TextSearch
                        onChange={onChangeSearchTerm}
                        searchTerm={searchTerm}
                    />
                </Col>
            </Row>
            <Loader loading={loading} />
            <Row>
                <Col className="is-full">
                    {
                        loading ? null : <JobList jobs={sortedJobs} setSearchTerm={setSearchTerm}/>
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <Pagination
                        start={start}
                        total={total}
                        defaultLimit={defaultLimit}
                        setStart={setStart}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default HomeView
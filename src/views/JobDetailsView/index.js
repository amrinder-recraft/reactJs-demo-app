import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Editor } from 'react-draft-wysiwyg'
import { useGetJob } from '../../hooks/jobs'
import { useChangeTitle, useTrackPage } from '../../hooks/common'

import Row from 'components/Layout/Row'
import Col from 'components/Layout/Col'
import Container from 'components/Layout/Container'
import Loader from 'components/Loader/Loader'
import ApplyModal from 'components/ApplyModal/ApplyModal'
import Tags from '../../components/Tags/Tags'

import { getJobLink } from 'utils/common'

import '../../style/job-details-view.css'

const JobDetailsView = ({
    match,
    location
}) => {
    const { id } = match.params
    let splitLink =  id.split('_~')
    let lastItemOfSplitLink = splitLink.length - 1
    let modifiedId = splitLink[lastItemOfSplitLink]
    const [job, loading, errorMsg] = useGetJob(modifiedId)
    const [isModalOpen, setModalState] = useState(false)
    const onsetModalState = () => setModalState(!isModalOpen)

    useChangeTitle(`${job.position || ''} | ${job.company_name || ''}`)
    useTrackPage(location)

    if (loading) {
        return <Loader loading={loading} />
    }

    let job_link = getJobLink(job)

    if (errorMsg) {
        return (
            <Container className="JobDetailsView">
                 <Row>
                    <Col className="has-text-centered no-search">
                        <p>
                            {errorMsg} !
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col className="has-text-centered">
                        <Link to="/"><i className="fas fa-long-arrow-alt-left"></i> Back to all jobs</Link>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        <Container className="JobDetailsView">
            <Row>
                <Col>
                    <Link to="/"><i className="fas fa-long-arrow-alt-left"></i> Back to all jobs</Link>
                </Col>
            </Row>
            <Row>
                <Col className="is-half">
                    <h1>{job.position}</h1>
                </Col>
                <Col className="is-half has-text-right is-hidden-mobile">
                    <h3>{job.company_name}</h3>
                </Col>
                <Col className="is-half is-hidden-tablet">
                    <h3>{job.company_name}</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>{moment(job.publishedDate).format("dddd, Do MMM YYYY")}</p>
                    <h5>Headquarters: {`${job.cities ? `${job.cities.trim()},` : ''} ${job.location && job.location.label}`}</h5>
                    {job.phone ? <p>Contact number: {job.phone}</p> : ''}
                    <div className="mail-tags-content">
                        <a className="direct-mail" href={`mailto:?to=${job.company_email}`}>Send a direct email</a>
                    </div>
                </Col>
                <Col className="has-text-right">
                    <ul className="social-share-ul is-hidden-touch">
                        <li>
                            <a className="hyper-link" href={`http://twitter.com/share?&url=${job_link}`} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i> <span>Tweet this job</span>
                            </a>
                        </li>
                        <li>
                            <a className="hyper-link" href={`https://www.linkedin.com/shareArticle?mini=true&url=${job_link}/&title=${job_link}/&summary=&source=`} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin-in"></i> <span>Post on Linkedin</span>
                            </a>
                        </li>
                        <li>
                            <a className="hyper-link" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(job_link)}`} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f"></i> <span>Share this on facebook</span>
                            </a>
                        </li>
                        <li>
                        </li>
                    </ul>
                    <div className="tags post-tags">
                        {job.remotelyJob ? <p><b>This job is Remotely available</b></p> : ''}
                        <div>
                            <Tags tags={job.tags} />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="is-full">
                    <Editor
                        editorState={job.message}
                        toolbarClassName="job-message-toolbar"
                        wrapperClassName="job-message-wrapper"
                        editorClassName="job-message-editor"
                        readOnly
                    />
                </Col>
            </Row>
            <Row className="is-mobile-fixed">
                <Col className="apply-now-container has-text-centered">
                    <button onClick={onsetModalState} className="button is-success">Apply for this Position</button>
                </Col>
            </Row>
            <ApplyModal isModalOpen={isModalOpen} setModalState={onsetModalState} selectedJob={{...job, job_link: job_link}}/>
        </Container>
    )
}

export default JobDetailsView
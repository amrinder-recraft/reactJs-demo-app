import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import Row from 'components/Layout/Row'
import Col from 'components/Layout/Col'
import ApplyModal from 'components/ApplyModal/ApplyModal'
import Tags from 'components/Tags/Tags'

import { getJobLink, createSlug } from 'utils/common'

const JobListItem = ({
    job,
}) => {

    const [isModalOpen, setModalState] = useState(false)
    const onsetModalState = () => setModalState(!isModalOpen)
    let job_link = getJobLink(job)
    let createdSlug = createSlug(job || {})

    return (
        <div className="box">
            <article className="media" >
                <div className="media-content">
                    <div className="content">
                        <Link to={`/job/${createdSlug}`} className="JobListItem">
                            <Row>
                                <Col>
                                    <h2 className="job-company-position">{job.position}</h2>
                                    <span className="job-company-position is-hidden-desktop">{moment(job.publishedDate).format("dddd, Do MMM YYYY")}</span>
                                </Col>
                                <Col className="is-hidden-touch">
                                    <span className="job-company-position is-pulled-right">{moment(job.publishedDate).format("dddd, Do MMM YYYY")}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3 className="job-company-name">{job.company_name}</h3>
                                    <strong><span>{job.location.label}</span></strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="break-word">
                                        {job.messageText.substr(0, 250)}...
                                    </p>
                                </Col>
                            </Row>
                        </Link>
                        <Row className="is-mobile is-hidden-mobile">
                            <Col>
                                <button
                                    className="button is-success"
                                    onClick={onsetModalState}
                                >
                                    Apply now
                                </button>
                            </Col>
                            <Col>
                                <div className="tags is-pulled-right">
                                    <Tags tags={job.tags} />
                                </div>
                            </Col>
                        </Row>
                        <Row className="is-hidden-tablet">
                            <Col>
                                <div className="tags is-centered">
                                    <Tags tags={job.tags} />
                                </div>
                            </Col>
                        </Row>
                        <Row className="is-hidden-tablet">
                            <Col className="has-text-centered">
                                <button
                                    className="button is-success apply-full-width"
                                    onClick={onsetModalState}
                                >
                                    Apply now
                                </button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </article>
            <ApplyModal isModalOpen={isModalOpen} setModalState={onsetModalState} selectedJob={{...job, job_link}} />
        </div>
    )

}

export default JobListItem
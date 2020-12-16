import React from 'react'
import { Link } from 'react-router-dom'

import Row from 'components/Layout/Row'
import Col from 'components/Layout/Col'
import Container from 'components/Layout/Container'
import SocialShare from 'components/SocialShare/SocialShare'

import '../../style/job-success.css'
import { createSlug } from '../../utils/common';

const JobSuccess = ({ job }) => {
    return (
        <Container className="jobsucess">
            <Row className="is-centered successfully">
                <Col className="is-one-third">
                    <div className="notification is-primary has-text-centered">
                        Your job is successfully added!
                </div>
                </Col>
            </Row>
            <Row className="is-centered job-post">
                <Col className="is-one-third">
                    <div className="has-text-centered">
                        <Link to={`/job/${createSlug(job)}`}>
                            <strong>Go to your job post</strong>
                        </Link>
                    </div>
                </Col>
            </Row>
            <SocialShare job={job}/>
        </Container>
    )
}

export default JobSuccess
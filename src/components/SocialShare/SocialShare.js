import React from 'react'

import Row from 'components/Layout/Row'
import Col from 'components/Layout/Col'

import { getJobLink } from 'utils/common'

import '../../style/social-share.css'

const SocialShare = ({ job }) => {

    let job_link = getJobLink(job)

    return (
        <Row className="is-centered share-job">
            <Col className="is-hidden-touch is-one-third has-text-centered">
                <h1 className="title">Share this job</h1>
                <ul className="social-share">
                    <li>
                        <a className="link" href={`http://twitter.com/share?&url=${job_link}`} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i> <span>Tweet this job</span>
                        </a>
                    </li>
                    <li>
                        <a className="link" href={`https://www.linkedin.com/shareArticle?mini=true&url=${job_link}/&title=${job_link}/&summary=&source=`} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin-in"></i> <span>Post on Linkedin</span>
                        </a>
                    </li>
                    <li>
                        <a className="link" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(job_link)}`} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i> <span>Share this on facebook</span>
                        </a>
                    </li>
                </ul>
            </Col>
        </Row>
    )

}

export default SocialShare
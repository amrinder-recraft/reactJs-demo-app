import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router"

import StrippedNavbar from './StrippedNavbar'
import Container from 'components/Layout/Container'
import Logo from 'components/Logo'
import Row from 'components/Layout/Row'
import Col from 'components/Layout/Col'

import GooglePlayBadge from '../../assets/google-play-badge.svg'

const NavBar = (props) => {
    const { location = {} } = props
    const { pathname = '' } = location
    if (pathname === '/post') {
        return <StrippedNavbar />
    }
    return (
        <Container>
            <Row className="navbar is-mobile">
                <Col className="is-half">
                    <div className="navbar-brand">
                        <Link className="navbar-item is-hidden-touch" to="/">
                            Jobs Buddha
                        </Link>
                        <Link className="navbar-item is-hidden-desktop" to="/">
                            <Logo />
                        </Link>
                    </div>
                </Col>
                <Col className="is-half is-flex level-right">
                    <div className="navbar-item justify-end is-flex">
                        <a className="google-play-badge is-hidden-mobile" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.jobsbuddhamobile&hl=en" target="_blank">
                            <img src={GooglePlayBadge} alt = "GooglePlayBadge"/>
                        </a>
                        <div className="buttons justify-end">
                            <Link to="/post" className="button is-success">
                                <strong>Post A Job</strong>
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default withRouter(NavBar)
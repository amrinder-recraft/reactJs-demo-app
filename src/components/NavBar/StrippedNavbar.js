import React from 'react'
import { Link } from 'react-router-dom'

import Logo from 'components/Logo'
import Container from 'components/Layout/Container'

import '../../style/stripped-navbar.css'

const StrippedNavbar = () => {
    return (
        <Container className="stripped-navbar">
            <Link to="/">
                <Logo />
            </Link>
        </Container>
    )
}

export default StrippedNavbar
import React from 'react'
import Row from 'components/Layout/Row'

const Loader = (props) => props.loading ?
    <Row className="loading-container">
        <Row className="loading"></Row>
    </Row>
    : null

export default Loader

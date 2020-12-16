import React from 'react'

import Row from 'components/Layout/Row'
import Col from 'components/Layout/Col'
import Container from 'components/Layout/Container'

import '../../style/footer.css'

import RecraftLogo from '../../assets/recraft-logo.png'

const Footer = () => <Container className="footer-container">
  <Row className="has-text-centered">
    <Col className="is-3 footer-jobs-buddha-copy-right">
      <i className="far fa-copyright copy-icon"></i>
      <span className="copy">Jobs Buddha (A recraft relic product)</span>
    </Col>
    <Col className="is-6 footer-jobs-buddha">
      <a href="http://recraftrelic.com/" target="_blank" rel="noopener noreferrer">
        <img src={RecraftLogo} width="60" alt="recraft logo" />
      </a>
    </Col>
    <Col className="is-3 footer-jobs-buddha-social-icons is-hidden-touch">
      <a target="_blank" href="https://www.facebook.com/recraftrelic" rel="noopener noreferrer">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a target="_blank" href="https://twitter.com/recraftrelic" rel="noopener noreferrer">
        <i className="fab fa-twitter"></i>
      </a>
    </Col>
    <Col className="is-3 footer-jobs-buddha-social-icons is-hidden-desktop mobile">
      <a target="_blank" href="https://www.facebook.com/recraftrelic" rel="noopener noreferrer">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a target="_blank" href="https://twitter.com/recraftrelic" rel="noopener noreferrer">
        <i className="fab fa-twitter"></i>
      </a>
    </Col>
  </Row>
</Container>

export default Footer
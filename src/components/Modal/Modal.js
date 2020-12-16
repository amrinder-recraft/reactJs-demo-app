import React from 'react'
import Row from 'components/Layout/Row'
import Col from 'components/Layout/Col'

const Modal = ({ isModalOpen, children, title = '', setModalState }) => 
    <div className={`modal ${isModalOpen ? 'is-active' : ''}`} >
        <div className="modal-background"></div>
        <div className="modal-card">
            <section className="modal-card-body">
                <Row className="is-mobile">
                    <Col>
                        <p className="modal-card-title">{title}</p>
                    </Col>
                    <Col className="has-text-right">
                        <button className="delete" aria-label="close" onClick={() => setModalState(false)}></button>
                    </Col>
                </Row>
                {children}
            </section>
        </div>
    </div>

export default Modal

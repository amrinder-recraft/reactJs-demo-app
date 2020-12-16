import React, { Fragment } from 'react'
import is from 'is_js'

import FieldWithLabel from 'components/Field/FieldWithLabel'
import Row from 'components/Layout/Row'
import Col from 'components/Layout/Col'
import Uploader from 'components/Form/Uploader'
import ErrorHelpText from 'components/Form/ErrorHelpText'
import CheckBox from '../Form/CheckBox'

import { getBorderClass } from 'utils/common'

const ApplyForm = ({ errors, apply, onChangeText, onChangeCheck, onDrop, loading, onSubmit, file, fileName, setFile }) =>
    <Fragment>
        <FieldWithLabel label="Name" error={errors.name}>
            <input
                className={`input ${getBorderClass(errors.name)}`}
                type="text"
                placeholder="Name"
                name="name"
                value={apply.name}
                onChange={onChangeText}
                disabled={loading}
            />
        </FieldWithLabel>
        <FieldWithLabel label="Email" error={errors.email}>
            <input
                className={`input ${getBorderClass(errors.email)}`}
                type="email"
                placeholder="Email"
                name="email"
                value={apply.email}
                onChange={onChangeText}
                disabled={loading}
            />
        </FieldWithLabel>
        <FieldWithLabel label="Phone" error={errors.phone}>
            <input
                className={`input ${getBorderClass(errors.phone)}`}
                type="number"
                placeholder="Phone"
                name="phone"
                value={apply.phone}
                onChange={onChangeText}
                disabled={loading}
            />
        </FieldWithLabel>
        <FieldWithLabel label="Message" error={errors.message}>
            <textarea
                className={`textarea ${getBorderClass(errors.message)}`}
                placeholder="Message..."
                name="message"
                value={apply.message}
                onChange={onChangeText}
                disabled={loading}
            >
            </textarea>
        </FieldWithLabel>
        <CheckBox
            label="Save this information for the next applications"
            name="saveInformation"
            type="checkbox"
            checked={apply.saveInformation}
            disabled={loading}
            onChange={onChangeCheck}
        />
        <Row className="is-mobile">
            {
                is.empty(file) ?
                <Col>
                    <Uploader onDrop={onDrop} loading={loading}>
                        <div className="field">
                            <div className="file is-small">
                                <label className="file-label">
                                    <span className={`file-cta font-1rem ${getBorderClass(errors.file)}`}>
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Upload Resume
                                    </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </Uploader>
                    <ErrorHelpText errors={errors.file} />
                </Col> 
                : 
                <Col>
                    <span className="tag is-medium tag-padding">
                        <a href={file} className="tag is-medium remove-padding" rel="noopener noreferrer" target="_blank">
                            {fileName}
                        </a>
                        <button className="delete is-small" onClick={() => setFile({})}></button>
                    </span>
                </Col>
            }
            <Col className="has-text-right">
                <button
                    className={`button is-success ${loading ? 'is-loading' : ''}`}
                    onClick={onSubmit}
                    disabled={loading}
                >
                    <span className="icon is-small">
                        <i className="fa fa-paper-plane"></i>
                    </span>
                    <span>Submit</span>
                </button>
            </Col>
        </Row>
    </Fragment>

export default ApplyForm

import React, { useState, useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import useOnOutsideClick from 'on-outside-click-hook'

import FieldWithLabel from 'components/Field/FieldWithLabel'
import Row from 'components/Layout/Row'
import Col from 'components/Layout/Col'
import Container from 'components/Layout/Container'
import TagsInput from './TagsInput'
import CountryDropDown from './CountryDropDown'

import { useChangeTitle } from '../../../hooks/common'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import CheckBox from '../../../components/Form/CheckBox';

const PostJobForm = ({
    jobPost,
    onChangeText,
    errors,
    setJobPostData,
    setErrors,
    loading,
    saveJob,
    inputTagValue,
    tagsHandleChange,
    onTagsInputChange,
    tagsHandleKeyDown,
    statesCitiesList,
    onChangeCheck
}) => {
    useChangeTitle('Post Job')

    const [toggleStatesCities, setToggleStatesCities] = useState(true)
    const elementInstance = useOnOutsideClick(() => setToggleStatesCities(false))

    useEffect(() => {
        setToggleStatesCities(true)
    }, [jobPost.cities])
    return (
        <Container className="post_form">
            <Row className="tell-us">
                <Col>
                    <p>Tell us about your job</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FieldWithLabel label="Company Name" error={errors.company_name}>
                        <input
                            className={`input ${errors.company_name && errors.company_name.length ? 'is-danger' : '' }`}
                            type="text"
                            placeholder="Enter Company Name"
                            name="company_name"
                            value={jobPost.company_name}
                            onChange={onChangeText}
                        />
                    </FieldWithLabel>
                    <FieldWithLabel label="Company Email" error={errors.company_email}>
                        <input
                            className={`input ${errors.company_email && errors.company_email.length ? 'is-danger' : '' }`}
                            type="email"
                            placeholder="Enter Company Email"
                            name="company_email"
                            value={jobPost.company_email}
                            onChange={onChangeText}
                        />
                    </FieldWithLabel>
                </Col>
                <Col>
                    <FieldWithLabel label="Position" error={errors.position}>
                        <input
                            className={`input ${errors.position && errors.position.length ? 'is-danger' : '' }`}
                            type="text"
                            placeholder="Enter Position"
                            name="position"
                            value={jobPost.position}
                            onChange={onChangeText}
                        />
                    </FieldWithLabel>
                    <FieldWithLabel label="Company Location" error={errors.location}>
                        <CountryDropDown
                            className={`${errors.location && errors.location.length ? 'border-danger-country' : ''}`}
                            onChange={data => {
                                setErrors({
                                    location: []
                                })
                                setJobPostData({
                                    location: data
                                })
                            }}
                            value={jobPost.location}
                        />
                    </FieldWithLabel>
                </Col>
            </Row>
            <Row className="column-reverse">
                <Col>
                <FieldWithLabel label="Phone Number" error={errors.phone}>
                    <input
                        className={`input ${errors.phone && errors.phone.length ? 'is-danger' : '' }`}
                        type="number"
                        placeholder="Enter Phone Number"
                        name="phone"
                        value={jobPost.phone}
                        onChange={onChangeText}
                    />
                    </FieldWithLabel>	
                </Col>
                <Col className="relative">
                    <FieldWithLabel label="State/Cities" error={errors.cities}>
                        <input
                            className={`input ${errors.cities && errors.cities.length ? 'is-danger' : '' }`}
                            type="text"
                            placeholder="State/Cities"
                            name="cities"
                            value={jobPost.cities}
                            onChange={onChangeText}
                            onFocus={() => setToggleStatesCities(true)}
                            ref={elementInstance}
                        />
                    </FieldWithLabel>
                    {
                        toggleStatesCities && statesCitiesList.length ?
                            <div className="list is-hoverable states-cities">
                            {
                                statesCitiesList.length ? statesCitiesList.map((statesCities, index) => {
                                    return <span className="list-item" key={index} onClick={() => setJobPostData({ cities:`${statesCities.name} - ${statesCities.adminName1}`})}>
                                        {`${statesCities.name} - ${statesCities.adminName1}`}
                                    </span>
                                }) : null
                            }
                        </div> : null
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                <FieldWithLabel label="Tags" error={errors.tags}>
                    <TagsInput
                        value={jobPost.tags}
                        inputValue={inputTagValue}
                        onChange={tagsHandleChange}
                        onInputChange={onTagsInputChange}
                        onKeyDown={tagsHandleKeyDown}
                        className={`${errors.tags && errors.tags.length ? 'is-danger-tag' : ''}`}
                    />
                    {
                        errors.tags && errors.tags.length ? null :
                        <p className="help">
                            e.g: Type 'tag name' then press 'enter', 'tab' or 'spacebar' to add tags.
                        </p>
                    }
				</FieldWithLabel>
                </Col>
                <Col className="remotelyJob">
                    <CheckBox
                        label="Is this job remotely available ?"
                        name="remotelyJob"
                        type="checkbox"
                        checked={jobPost.remotelyJob}
                        onChange={onChangeCheck}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="is-full">
                    <FieldWithLabel label="Message" error={errors.messageText}>
                        <Editor
                            editorState={jobPost.message}
                            toolbarClassName="job-message-toolbar"
                            wrapperClassName={`job-message-wrapper ${errors.messageText && errors.messageText.length  ? 'border-danger-country' : ''}`}
                            editorClassName="job-message-editor"
                            onEditorStateChange={message => {
                                setErrors({
                                    messageText: []
                                })
                                setJobPostData({ message })
                            }}
                        />
                    </FieldWithLabel>
                </Col>
            </Row>
            <button className={`button is-success is-pulled-right ${loading ? 'is-loading' : ''}`} onClick={saveJob}>
                Submit Job
            </button>
        </Container>
    )
}

export default PostJobForm
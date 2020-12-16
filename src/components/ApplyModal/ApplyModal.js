import React, { useState, useEffect } from 'react'
import is from 'is_js'

import Modal from 'components/Modal/Modal'
import ApplyForm from './ApplyForm'

import { useMergeState } from '../../hooks/common'
import { apiUploadFile, apiApplyJob } from 'api/apply'

import { validateApplyJob } from 'utils/jobs'
import { API_URL } from 'constants'

import '../../style/apply-modal.css'
import { saveApplicant, getApplicant } from '../../utils/jobs'

const emptyApplicant = {
    name: '',
    email: '',
    phone: '',
    message: '',
    saveInformation: ''
}

const ApplyModal = ({ selectedJob, isModalOpen, setModalState }) => {

    const [apply, setApply, replaceApply] = useMergeState(emptyApplicant)

    const [errors, setErrors] = useMergeState({})
    const [file, setFile] = useState({})
    const [fileName, setFileName] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const applicant = getApplicant()

        if (!is.empty(applicant) && isModalOpen) {
            const { file, fileName, ...restOfApplicant } = applicant
            setApply(restOfApplicant)
            setFile(file)
            setFileName(fileName)
        }

        if (!isModalOpen) {
            setFile({})
            replaceApply(emptyApplicant)
        }

    }, [isModalOpen])

    const onChangeText = e => {
        const { name, value } = e.target

        setErrors({
            [name]: [],
        })

        setApply({
            [name]: value
        })
    }

    const onChangeCheck = e => {
        const { name, checked } = e.target

        setApply({
            [name]: checked
        })
    }

    const onDrop = (files) => {

        if (!files.length) {
            return
        }
        
        setFileName(files[0].name)

        setLoading(true)
        let data = new FormData()
        data.append('file', files[0])

        setErrors({
            file: [],
        })

        apiUploadFile(data).then(res => {
            setLoading(false)
            setFile(`${API_URL}/${res.uploadUrl}`)
        })
    }

    const onSubmit = () => {
        setLoading(true)

        const errors = validateApplyJob({...apply, file})

        if (!is.empty(errors)) {
            setLoading(false)
            setErrors(errors)
            return
        }

        const { name, phone, email, message, saveInformation } = apply

        if (saveInformation) {
            saveApplicant({ name, phone, email, message, saveInformation, file, fileName })
        } else {
            saveApplicant({})
        }

        let applicant = {
            firstName: name.split(' ')[0] || name,
            phoneNo: phone,
            resumeLink: file,
            email,
            message
        }

        const { company_name, position, company_email, job_link } = selectedJob

        let job = { company_name, position, company_email, job_link }

        apiApplyJob({applicant, job}).then(res => {
            setLoading(false)
            setModalState(false)
        })
    }

    const applyFormProps = {errors, apply, onChangeText, onDrop, loading, onChangeCheck, onSubmit, file, fileName, setFile}

    return (
        <Modal isModalOpen={isModalOpen} setModalState={setModalState} title={'Apply now'}>
            <ApplyForm
                {...applyFormProps}
            />
        </Modal>
    )
}

export default ApplyModal
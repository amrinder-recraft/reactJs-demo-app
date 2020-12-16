import { convertToRaw, EditorState, convertFromRaw } from 'draft-js'
import moment from 'moment'
import simpleValidate from './simpleValidate'

import { saveObject, getObject } from 'utils/common'

export const convertJobToPayload = jobPost => {
    const { location, message, tags, cities } = jobPost
    const { label, value } = location
    let citiesArr = cities.split('-')

    const messageRawContent = convertToRaw(message.getCurrentContent())
    const messageStringified = JSON.stringify(messageRawContent)
    let tagsArr = tags.map(tag => tag.value)

    const newJobPost = {
        ...jobPost,
        location: { label, value },
        message: messageStringified,
        messageText: message.getCurrentContent().getPlainText(),
        tags: tagsArr,
        cities: citiesArr[0]
    }
    
    return newJobPost
}

export const convertJobFromPayload = jobPost => {
    const editorState = convertFromRaw(
        JSON.parse(jobPost.message)
    )

    return {
        ...jobPost,
        message: EditorState.createWithContent(editorState)
    }
}

export const validateJobPost = jobPost => {
    const errors = simpleValidate.validate({
        company_name: {
            required: {
                errorMsg: `Company Name is required`
            }
        },
        company_email: {
            required: {
                errorMsg: `Email is required`
            },
            email: {
                errorMsg: `Enter a valid email`
            }
        },
        position: {
            required: {
                errorMsg: `Position is required`
            }
        },
        cities: {
            required: {
                errorMsg: `State/Cities is required`
            }
        },
        location: {
            validLocation: {
                errorMsg: `Location is required`
            }
        },
        messageText: {
            required: {
                errorMsg: `Message is required`
            },
            length: {
                min: 200,
                errorMsg: 'Message must be 200 words long'
            }
        },
        tags: {
            required: {
                errorMsg: `Tags is required`
            },
            length: {
                max:5,
                errorMsg: 'Max 5 tags are allowed'
            }
		}, 
		phone: {
            length: {
                min: 10,
                max: 10,
                errorMsg: 'Phone number must be 10 digits only'
            }
        }
    }, jobPost)

    return errors
}

export const validateApplyJob = applicantInformation => {
    const errors = simpleValidate.validate({
        name: {
            required: {
                errorMsg: `Name is required`
            }
        },
        email: {
            required: {
                errorMsg: `Email is required`
            },
            email: {
                errorMsg: `Enter a valid email`
            }
        },
        phone: {
            required: {
                errorMsg: `Phone is required`
            },
            length: {
                min: 10,
                max: 10,
                errorMsg: 'Phone number must be 10 digits only'
            }
        },
        message: {
            required: {
                errorMsg: `Message is required`
            },
            length: {
                min: 200,
                errorMsg: 'Message must be 200 words long'
            }
        },
        file: {
            required: {
                errorMsg: `Resume is required`
            }
        }
    }, applicantInformation)

    return errors
}

export const sortJobs = jobs => {
    const sortedJobs = jobs.sort(
        (firstItem, secondItem) => {
            let sortOrder = 0
            if (firstItem.publishedDate === secondItem.publishedDate) {
                sortOrder = 0
            }

            if (!moment(firstItem.publishedDate).isAfter(moment(secondItem.publishedDate))) {
                sortOrder = -1
            }

            if (moment(firstItem.publishedDate).isAfter(moment(secondItem.publishedDate))) {
                sortOrder = 1
            }
            return sortOrder
        }
    )

    return sortedJobs
}

export const saveApplicant = applicant => saveObject('applicant', applicant)

export const getApplicant = () => getObject('applicant') || {}

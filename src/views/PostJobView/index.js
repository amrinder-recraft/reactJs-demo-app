import React, { useState } from 'react'
import is from 'is_js'
import { EditorState } from 'draft-js'

import JobSuccess from './JobSuccess'
import PostJobForm from './components/PostJobForm'

import { useMergeState, useTrackPage } from '../../hooks/common'

import { apiSaveJob } from 'api/jobs'
import { apiGetStates } from '../../api/state'
import { convertJobToPayload, validateJobPost } from 'utils/jobs'

const PostJobView = ({ location }) => {

  useTrackPage(location)

  const [loading, setLoading] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [inputTagValue, setInputTagValue] = useState('')
  const [statesCitiesList, setStatesCitiesList] = useState([])
  const [errors, setErrors] = useMergeState({})
  const [jobPost, setJobPostData] = useMergeState({
    company_name: '',
    company_email: '',
    position: '',
    location: '',
    message: EditorState.createEmpty(),
    tags: [],
    cities:'',
    phone:'',
    remotelyJob:false
  })


  const onChangeText = e => {

    if(e.target.name === 'phone' && e.target.value.length > 10){
      return 
    }

    if (e.target.name === 'cities') {
      apiGetStates(jobPost.location.alpha2Code, e.target.value).then(({places = []}) => {
        setStatesCitiesList(places)
      })
    }

    setErrors({
      [e.target.name]: []
    })

    setJobPostData({
      [e.target.name]: e.target.value
    })

  }

  const onChangeCheck = e => {
    const { name, checked } = e.target

    setJobPostData({
        [name]: checked
    })
}

  const createOption = (label) => ({
    label,
    value: label,
  })

  const tagsHandleChange = tags => setJobPostData({ tags })

  const onTagsInputChange = inputTagValue => {
    setInputTagValue(inputTagValue)
    setErrors({
      tags: []
    })
  }

  const tagsHandleKeyDown = (event) => {
    if (!inputTagValue) return

    switch (event.key) {
      case 'Enter':
      case 'Tab':
      case ',':
      case ' ':
        setInputTagValue('')
        const { tags = [] } = jobPost
        let index = tags.findIndex((tag) => tag.value === inputTagValue)
        if (index === -1) {
          tagsHandleChange([...tags, createOption(inputTagValue)])
        }
        event.preventDefault()
        break
      default:
        return
    }
  }

  const saveJob = () => {
    const newJobPost = convertJobToPayload(jobPost)
    const errors = validateJobPost(newJobPost)

    if (!is.empty(errors)) {
      setErrors(errors)
      return
    }

    setLoading(true)

    apiSaveJob(newJobPost)
      .then(({ _id }) => {
        setJobPostData({ _id })
        setLoading(false)
        setSubmit(true)
      })
      .catch(() => setLoading(false))
  }

  if (submit) return <JobSuccess job={jobPost} />

  const PostJobFormProps = {
    jobPost,
    onChangeText,
    errors,
    setJobPostData,
    loading,
    saveJob,
    setErrors,
    inputTagValue,
    tagsHandleChange,
    onTagsInputChange,
    tagsHandleKeyDown,
    statesCitiesList,
    onChangeCheck
  }

  return <PostJobForm {...PostJobFormProps} />
}

export default PostJobView
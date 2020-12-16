import React from 'react'

import JobListItem from './JobListItem'

const JobList = ({
    jobs = [],
}) => {
    if (jobs.length) {
        return jobs.reverse().map(
            (job, index) =>
                <JobListItem key={index} job={job} />
        )
    }

    return (
        <div className="no-search">
            <p>No Jobs Found!</p>
        </div>
    )
}

export default JobList
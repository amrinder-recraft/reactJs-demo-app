import React from 'react'
import { withRouter } from "react-router"
import { Link } from 'react-router-dom'

const Tags = (props) => {
    let { tags = [] } = props
    return (
        tags.map((tag, index) =>
                <Link key={index} className="tag remove-underline" to={`/?searchTerm=${tag}`}>#{tag}</Link>
        )
    )
}

export default withRouter(Tags)
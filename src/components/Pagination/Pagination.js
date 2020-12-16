import React from 'react'

const Pagination = ({
    start,
    total,
    defaultLimit,
    setStart
}) => 
    <nav className="pagination" role="navigation" aria-label="pagination">
        <button className="pagination-previous button" disabled={start === 0} onClick={() => setStart(start - defaultLimit)}>
            <span className="icon">
                <i className="fas fa-arrow-left"></i>
            </span>
            <span>
                Previous
            </span>
        </button>
        <button className="pagination-next button" disabled={start + defaultLimit >= total} onClick={() => setStart(start + defaultLimit)}>
            <span>
                Next page
            </span>
            <span className="icon">
                <i className="fas fa-arrow-right"></i>
            </span>
        </button>
    </nav>

export default Pagination

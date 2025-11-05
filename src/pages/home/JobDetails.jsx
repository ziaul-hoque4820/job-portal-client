import React, { useEffect, useState } from 'react'
import JobCart from './JobCart'
import JobModal from './JobModal'

function JobDetails() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedJob, setSelectedJob] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3000/jobs')
            .then(res => res.json())
            .then(data => {
                setJobs(data)
                setLoading(false)
            })
    }, [])

    if (loading) return <p className="text-center py-10">Loading jobs...</p>

    return (
        <div className="px-6 lg:px-16 xl:px-34 py-10">
            <div className="text-center mb-10">
                <h2 className='text-2xl lg:text-5xl font-bold'>Find Your Dream Job</h2>
                <p className='py-3 font-semibold'>Explore opportunities & apply with confidence</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {jobs.map(job => (
                    <JobCart
                        key={job._id}
                        job={job}
                        onClick={() => setSelectedJob(job)}
                    />
                ))}
            </div>

            {selectedJob && (
                <JobModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    )
}

export default JobDetails

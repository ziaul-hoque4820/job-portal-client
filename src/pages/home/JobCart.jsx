import React from 'react'

function JobCart({ job, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-white shadow-lg rounded-xl p-5 border hover:shadow-2xl transition duration-300 cursor-pointer"
        >
            <div className="flex items-center gap-4">
                <img
                    src={job.company_logo}
                    alt={job.company}
                    className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-gray-500 text-sm">{job.company}</p>
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-700 space-y-1">
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.jobType}</p>
            </div>
        </div>
    )
}

export default JobCart


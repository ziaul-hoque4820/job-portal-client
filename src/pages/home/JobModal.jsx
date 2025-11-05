import React from 'react'
import { Link } from 'react-router-dom'

function JobModal({ job, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-2xl">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 text-xl font-bold text-gray-600 hover:text-black cursor-pointer"
                >
                    ✕
                </button>

                {/* Content */}
                <div className="flex items-center gap-4">
                    <img src={job.company_logo} alt="" className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                        <h2 className="text-2xl font-bold">{job.title}</h2>
                        <p className="text-gray-500">{job.company}</p>
                    </div>
                </div>

                <p className="mt-3 text-gray-700">{job.description}</p>

                {/* Job Information */}
                <div className="mt-4 space-y-2 text-gray-700">
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Type:</strong> {job.jobType}</p>
                    <p><strong>Salary:</strong>
                        {job.salaryRange.min} - {job.salaryRange.max} {job.salaryRange.currency.toUpperCase()}
                    </p>
                    <p><strong>Deadline:</strong> {job.applicationDeadline}</p>
                </div>

                {/* Requirements */}
                <div className="mt-4">
                    <h3 className="font-semibold">Requirements</h3>
                    <ul className="list-disc ml-6 text-gray-700">
                        {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                </div>

                {/* Responsibilities */}
                <div className="mt-4">
                    <h3 className="font-semibold">Responsibilities</h3>
                    <ul className="list-disc ml-6 text-gray-700">
                        {job.responsibilities.map((res, i) => <li key={i}>{res}</li>)}
                    </ul>
                </div>

                {/* Apply Button */}
                <Link to={`/jobs/${job._id}`} className="block text-center w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Apply Now
                </Link>

            </div>
        </div>
    )
}

export default JobModal

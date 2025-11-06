import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth-context/AuthContext';
import { useLoaderData } from 'react-router-dom';

const JobApplicationPage = () => {
    const { user } = useContext(AuthContext);
    const jobDetails = useLoaderData();
    console.log(jobDetails);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Apply for Position</h1>
                    <p className="text-gray-600 mt-2">Complete your application by filling out the form below</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Job Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

                        {/* Company */}
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0">
                                <img
                                    src={jobDetails.company_logo}
                                    alt={jobDetails.company}
                                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{jobDetails.title}</h2>
                                <p className="text-xl text-blue-600 font-semibold mb-2">{jobDetails.company}</p>
                                <div className="flex items-center text-gray-600 text-sm">
                                    Posted by {jobDetails.hr_name} • {jobDetails.hr_email}
                                </div>
                            </div>
                        </div>

                        {/* Job Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="font-medium">{jobDetails.location}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Job Type</p>
                                <p className="font-medium">{jobDetails.jobType}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Salary</p>
                                <p className="font-medium">
                                    {jobDetails.salaryRange.min.toLocaleString()} - {jobDetails.salaryRange.max.toLocaleString()} {jobDetails.salaryRange.currency.toUpperCase()}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Apply Before</p>
                                <p className="font-medium">
                                    {new Date(jobDetails.applicationDeadline).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border">
                                    {jobDetails.description}
                                </p>
                            </div>

                            {/* Requirements */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                                <div className="bg-gray-50 p-4 rounded-lg border">
                                    <div className="flex flex-wrap gap-2">
                                        {jobDetails.requirements.map((item, i) => (
                                            <span key={i} className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 border">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Responsibilities */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Responsibilities</h3>
                                <div className="bg-gray-50 p-4 rounded-lg border">
                                    <ul className="text-gray-700 space-y-2">
                                        {jobDetails.responsibilities.map((item, i) => (
                                            <li key={i}>
                                                ✅ {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="p-4 bg-blue-50 border rounded-lg flex justify-between">
                                <p className="text-blue-800 font-medium">
                                    Job Status: {jobDetails.status}
                                </p>

                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${jobDetails.status === 'active'
                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                                    }`}>
                                    {jobDetails.status === 'active' ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Application Form */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Form</h2>

                        <form className="space-y-6">
                            {/* LinkedIn Profile */}
                            <div>
                                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                                    LinkedIn Profile URL
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="url"
                                        id="linkedin"
                                        name="linkedin"
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://linkedin.com/in/yourprofile"
                                    />
                                </div>
                            </div>

                            {/* GitHub Profile */}
                            <div>
                                <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-2">
                                    GitHub Profile URL
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="url"
                                        id="github"
                                        name="github"
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://github.com/yourusername"
                                    />
                                </div>
                            </div>

                            {/* Resume/CV Upload */}
                            <div>
                                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                                    Resume/CV
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="resume-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                                <span>Upload a file</span>
                                                <input id="resume-upload" name="resume-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            {/* Cover Letter */}
                            <div>
                                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                                    Cover Letter
                                </label>
                                <textarea
                                    id="coverLetter"
                                    name="coverLetter"
                                    rows={8}
                                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                                    placeholder="Write your cover letter here. Explain why you're interested in this position and what makes you a good fit..."
                                />
                                <p className="mt-2 text-sm text-gray-500">
                                    2000 characters
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default JobApplicationPage;
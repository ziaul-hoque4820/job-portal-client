import axios from 'axios';
import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function ViewApplication() {
    const { job_id } = useParams();
    const applicationsData = useLoaderData();
    const [applications, setApplications] = useState(applicationsData);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    console.log(applications);
    console.log(job_id);

    // Filter applications based on status and search term
    const filteredApplications = applications.filter(app => {
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        const matchesSearch = searchTerm === '' ||
            app.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.applicantEmail?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
            reviewed: { color: 'bg-blue-100 text-blue-800', label: 'Reviewed' },
            shortlisted: { color: 'bg-green-100 text-green-800', label: 'Shortlisted' },
            rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
            hired: { color: 'bg-purple-100 text-purple-800', label: 'Hired' }
        };

        const config = statusConfig[status] || statusConfig.pending;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                {config.label}
            </span>
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleStatusChange = async (applicationId, newStatus) => {

        try {
            const res = await axios.patch(`http://localhost:3000/applications/${applicationId}`, { status: newStatus });

            if (res.data.modifiedCount > 0) {
                // Update the local state
                setApplications(prevApplications =>
                    prevApplications.map(app =>
                        app._id === applicationId
                            ? { ...app, status: newStatus }
                            : app
                    )
                );

                // Update selected application if it's the one being updated
                if (selectedApplication && selectedApplication._id === applicationId) {
                    setSelectedApplication(prev => ({ ...prev, status: newStatus }));
                }

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Status Updated!",
                    text: `Application status changed to ${newStatus}`,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true,
                    background: '#f0f9ff',
                    iconColor: '#10b981'
                });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Update Failed",
                text: "Failed to update application status",
                showConfirmButton: false,
                timer: 3000,
                toast: true,
                background: '#fef2f2',
                iconColor: '#ef4444'
            });
        }
    };

    if (!applications || applications.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            There are no applications for this job posting yet.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const jobDetails = applications[0]; // Get job details from first application

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
                            <div className="mt-2 flex items-center space-x-4">
                                <div className="flex items-center">
                                    <img className="h-10 w-10 rounded-lg object-cover" src={jobDetails.companyLogo} alt={jobDetails.company} />
                                    <div className="ml-3">
                                        <h2 className="text-lg font-medium text-gray-900">{jobDetails.jobTitle}</h2>
                                        <p className="text-sm text-gray-500">{jobDetails.company}</p>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {applications.length} application{applications.length !== 1 ? 's' : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-gray-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total</dt>
                                        <dd className="text-lg font-medium text-gray-900">{applications.length}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {applications.filter(app => app.status === 'pending').length}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Reviewed</dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {applications.filter(app => app.status === 'reviewed').length}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Shortlisted</dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {applications.filter(app => app.status === 'shortlisted').length}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Rejected</dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {applications.filter(app => app.status === 'rejected').length}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white shadow rounded-lg mb-6">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex flex-wrap gap-4">
                                <div className="w-full sm:w-64">
                                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                                        Search Applicants
                                    </label>
                                    <input
                                        type="text"
                                        id="search"
                                        placeholder="Search by name or email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
                                        Filter by Status
                                    </label>
                                    <select
                                        id="statusFilter"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="reviewed">Reviewed</option>
                                        <option value="shortlisted">Shortlisted</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="hired">Hired</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">
                                    Showing {filteredApplications.length} of {applications.length} applications
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Applications List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white shadow overflow-hidden sm:rounded-md">
                            <ul className="divide-y divide-gray-200">
                                {filteredApplications.map((application) => (
                                    <li key={application._id}>
                                        <div
                                            className={`px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer ${selectedApplication?._id === application._id ? 'bg-blue-50' : ''
                                                }`}
                                            onClick={() => setSelectedApplication(application)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                            <span className="text-indigo-800 font-medium text-sm">
                                                                {application.applicantName ?
                                                                    application.applicantName.split(' ').map(n => n[0]).join('').toUpperCase() :
                                                                    application.applicantEmail[0].toUpperCase()
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="flex items-center">
                                                            <h3 className="text-sm font-medium text-gray-900">
                                                                {application.applicantName || 'Anonymous Applicant'}
                                                            </h3>
                                                            <div className="ml-2">
                                                                {getStatusBadge(application.status)}
                                                            </div>
                                                        </div>
                                                        <div className="mt-1">
                                                            <p className="text-sm text-gray-500">{application.applicantEmail}</p>
                                                        </div>
                                                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                                                            <span className="flex items-center">
                                                                <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                Applied {formatDate(application.appliedAt)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {application.linkedin && (
                                                        <a
                                                            href={application.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-400 hover:text-blue-600"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    {application.github && (
                                                        <a
                                                            href={application.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-400 hover:text-gray-600"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Application Details */}
                    <div className="lg:col-span-1">
                        {selectedApplication ? (
                            <div className="bg-white shadow rounded-lg sticky top-6">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium text-gray-900">Application Details</h3>
                                        <div>
                                            {getStatusBadge(selectedApplication.status)}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Applicant</h4>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {selectedApplication.applicantName || 'Not provided'}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Email</h4>
                                            <p className="mt-1 text-sm text-gray-900">{selectedApplication.applicantEmail}</p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Applied On</h4>
                                            <p className="mt-1 text-sm text-gray-900">{formatDate(selectedApplication.appliedAt)}</p>
                                        </div>

                                        {selectedApplication.linkedin && (
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">LinkedIn</h4>
                                                <a
                                                    href={selectedApplication.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-1 text-sm text-blue-600 hover:text-blue-800 break-all"
                                                >
                                                    {selectedApplication.linkedin}
                                                </a>
                                            </div>
                                        )}

                                        {selectedApplication.github && (
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">GitHub</h4>
                                                <a
                                                    href={selectedApplication.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-1 text-sm text-blue-600 hover:text-blue-800 break-all"
                                                >
                                                    {selectedApplication.github}
                                                </a>
                                            </div>
                                        )}

                                        {selectedApplication.resume && (
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">Resume</h4>
                                                <a
                                                    href={selectedApplication.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-1 text-sm text-blue-600 hover:text-blue-800 break-all"
                                                >
                                                    View Resume
                                                </a>
                                            </div>
                                        )}

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Cover Letter</h4>
                                            <div className="mt-1 p-3 bg-gray-50 rounded-md">
                                                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                                    {selectedApplication.coverLetter || 'No cover letter provided.'}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 mb-2">Update Status</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].map((status) => (
                                                    <button
                                                        key={status}
                                                        onClick={() => handleStatusChange(selectedApplication._id, status)}
                                                        className={`px-3 py-1 text-xs font-medium rounded-full ${selectedApplication.status === status
                                                            ? 'bg-indigo-600 text-white'
                                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                            }`}
                                                    >
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white shadow rounded-lg">
                                <div className="px-4 py-12 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">Select an application</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Click on an application from the list to view details
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewApplication;
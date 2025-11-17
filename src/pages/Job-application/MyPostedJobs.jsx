import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyPostedJobs = () => {
    const { user } = useAuth();
    // Mock data for demonstration
    const [jobs, setJobs] = useState([]);

    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');


    useEffect(() => {
        if (user?.email) {
            axios.get(`https://job-portal-server-yuf1.onrender.com/jobs?email=${user.email}`, { withCredentials: true })
                .then((res) => setJobs(res.data))
                .catch((err) => console.log(err));
        }

    }, [user]);

    const filteredJobs = jobs.filter(job => {
        if (filter === 'all') return true;
        return job.status === filter;
    });

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        if (sortBy === 'newest') {
            return new Date(b.postedDate) - new Date(a.postedDate);
        } else if (sortBy === 'applications') {
            return b.applications - a.applications;
        }
        return 0;
    });

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { color: 'bg-green-100 text-green-800', label: 'Active' },
            inactive: { color: 'bg-red-100 text-red-800', label: 'Inactive' },
            draft: { color: 'bg-gray-100 text-gray-800', label: 'Draft' }
        };

        const config = statusConfig[status] || statusConfig.draft;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                {config.label}
            </span>
        );
    };

    const getJobTypeBadge = (jobType) => {
        const typeConfig = {
            'Full-Time': 'bg-blue-100 text-blue-800',
            'Part-Time': 'bg-purple-100 text-purple-800',
            'Remote': 'bg-green-100 text-green-800',
            'Hybrid': 'bg-orange-100 text-orange-800',
            'Contractual': 'bg-pink-100 text-pink-800',
            'Intern': 'bg-indigo-100 text-indigo-800'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeConfig[jobType] || 'bg-gray-100 text-gray-800'}`}>
                {jobType}
            </span>
        );
    };

    const formatCurrency = (amount, currency) => {
        const formatter = new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: currency.toUpperCase(),
            minimumFractionDigits: 0
        });
        return formatter.format(amount);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Posted Jobs</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Manage and track your job postings
                            </p>
                        </div>
                        <Link to={'/addjob'} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Post New Job
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Jobs</dt>
                                        <dd className="text-lg font-medium text-gray-900">{jobs.length}</dd>
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
                                        <dt className="text-sm font-medium text-gray-500 truncate">Active Jobs</dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {jobs.filter(job => job.status === 'active').length}
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {jobs.reduce((total, job) => total + job.applications, 0)}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-orange-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Expiring Soon</dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {jobs.filter(job => {
                                                const deadline = new Date(job.applicationDeadline);
                                                const today = new Date();
                                                const diffTime = deadline - today;
                                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                return diffDays <= 7 && job.status === 'active';
                                            }).length}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Controls */}
                <div className="bg-white shadow rounded-lg mb-6">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex flex-wrap gap-4">
                                <div>
                                    <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
                                        Status Filter
                                    </label>
                                    <select
                                        id="filter"
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="all">All Jobs</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                                        Sort By
                                    </label>
                                    <select
                                        id="sort"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="applications">Most Applications</option>
                                        <option value="deadline">Deadline</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">
                                    Showing {sortedJobs.length} of {jobs.length} jobs
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Jobs List */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {sortedJobs.map((job) => (
                            <li key={job._id}>
                                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img className="h-12 w-12 rounded-lg object-cover" src={job.company_logo} alt={job.company} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="flex items-center">
                                                    <h3 className="text-lg font-medium text-indigo-600">{job.title}</h3>
                                                    <div className="ml-2 flex space-x-2">
                                                        {getStatusBadge(job.status)}
                                                        {getJobTypeBadge(job.jobType)}
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <p className="text-sm text-gray-500">
                                                        {job.company} • {job.location} • {job.category}
                                                    </p>
                                                </div>
                                                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                                                    <span className="flex items-center">
                                                        <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                        </svg>
                                                        {formatCurrency(job.salaryRange.min, job.salaryRange.currency)} - {formatCurrency(job.salaryRange.max, job.salaryRange.currency)}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        {job.applications} applications
                                                    </span>
                                                    <span className="flex items-center">
                                                        <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Link className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </Link>
                                            <Link to={`/applications/${job._id}`} className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                View Applicants
                                            </Link>
                                            <Link className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Empty State */}
                    {sortedJobs.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Get started by creating a new job posting.
                            </p>
                            <div className="mt-6">
                                <Link to={'/addjob'} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Post New Job
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyPostedJobs;
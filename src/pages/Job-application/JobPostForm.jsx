import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const JobPostForm = () => {
    const { user } = useAuth();

    // Initial form state
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        jobType: '',
        category: '',
        applicationDeadline: '',
        salaryRange: {
            min: '',
            max: '',
            currency: 'bdt'
        },
        description: '',
        company: '',
        requirements: [],
        responsibilities: [],
        status: 'active',
        hr_email: user?.email,
        hr_name: '',
        company_logo: ''
    });

    const [requirementInput, setRequirementInput] = useState('');
    const [responsibilityInput, setResponsibilityInput] = useState('');

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('salaryRange.')) {
            const salaryField = name.split('.')[1];
            setFormData({
                ...formData,
                salaryRange: {
                    ...formData.salaryRange,
                    [salaryField]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    // Add requirement
    const addRequirement = () => {
        if (requirementInput.trim() !== '') {
            setFormData({
                ...formData,
                requirements: [...formData.requirements, requirementInput.trim()]
            });
            setRequirementInput('');
        }
    };

    // Remove requirement
    const removeRequirement = (index) => {
        const newRequirements = [...formData.requirements];
        newRequirements.splice(index, 1);
        setFormData({
            ...formData,
            requirements: newRequirements
        });
    };

    // Add responsibility
    const addResponsibility = () => {
        if (responsibilityInput.trim() !== '') {
            setFormData({
                ...formData,
                responsibilities: [...formData.responsibilities, responsibilityInput.trim()]
            });
            setResponsibilityInput('');
        }
    };

    // Remove responsibility
    const removeResponsibility = (index) => {
        const newResponsibilities = [...formData.responsibilities];
        newResponsibilities.splice(index, 1);
        setFormData({
            ...formData,
            responsibilities: newResponsibilities
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        // Create the JSON object
        const jobPost = {
            title: formData.title,
            location: formData.location,
            jobType: formData.jobType,
            category: formData.category,
            applicationDeadline: formData.applicationDeadline,
            salaryRange: {
                min: parseInt(formData.salaryRange.min),
                max: parseInt(formData.salaryRange.max),
                currency: formData.salaryRange.currency
            },
            description: formData.description,
            company: formData.company,
            requirements: formData.requirements,
            responsibilities: formData.responsibilities,
            status: formData.status,
            hr_email: formData.hr_email,
            hr_name: formData.hr_name,
            company_logo: formData.company_logo
        };

        console.log(jobPost);

        // save data to the server
        axios.post('http://localhost:3000/jobs', jobPost)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Job Post!",
                        text: `Your Job Post has been Added Successfully.`,
                        showConfirmButton: false,
                        timer: 2000,
                        toast: true,
                        background: '#f0f9ff',
                        iconColor: '#10b981'
                    });
                }
                form.reset();
            })
            .catch(error => {
                console.log('Error creating job post:', error);
            })
    };



    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-4 bg-indigo-600 text-white">
                        <h2 className="text-2xl font-bold">Create Job Post</h2>
                        <p className="text-indigo-100">Fill in the details to create a new job posting</p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
                        {/* Basic Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Job Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        required
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="e.g. Software Engineer"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        required
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="e.g. Halishohor, Chittagong"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
                                        Job Type *
                                    </label>
                                    <select
                                        id="jobType"
                                        name="jobType"
                                        required
                                        value={formData.jobType}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="">Select Job Type</option>
                                        <option value="Full-Time">Full-Time</option>
                                        <option value="Part-Time">Part-Time</option>
                                        <option value="Contractual">Contractual</option>
                                        <option value="Intern">Intern</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        required
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Teaching">Teaching</option>
                                        <option value="Management">Management</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Design">Design</option>
                                        <option value="Development">Development</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">
                                        Application Deadline *
                                    </label>
                                    <input
                                        type="date"
                                        name="applicationDeadline"
                                        id="applicationDeadline"
                                        required
                                        value={formData.applicationDeadline}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                        Status *
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        required
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Salary Range */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Salary Range</h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                <div>
                                    <label htmlFor="salaryRange.min" className="block text-sm font-medium text-gray-700">
                                        Minimum Salary *
                                    </label>
                                    <input
                                        type="number"
                                        name="salaryRange.min"
                                        id="salaryRange.min"
                                        required
                                        value={formData.salaryRange.min}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="e.g. 40000"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="salaryRange.max" className="block text-sm font-medium text-gray-700">
                                        Maximum Salary *
                                    </label>
                                    <input
                                        type="number"
                                        name="salaryRange.max"
                                        id="salaryRange.max"
                                        required
                                        value={formData.salaryRange.max}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="e.g. 60000"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="salaryRange.currency" className="block text-sm font-medium text-gray-700">
                                        Currency *
                                    </label>
                                    <select
                                        id="salaryRange.currency"
                                        name="salaryRange.currency"
                                        required
                                        value={formData.salaryRange.currency}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="bdt">BDT</option>
                                        <option value="usd">USD</option>
                                        <option value="eur">EUR</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Company Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                        Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        id="company"
                                        required
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="e.g. Favorite IT"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="company_logo" className="block text-sm font-medium text-gray-700">
                                        Company Logo URL
                                    </label>
                                    <input
                                        type="url"
                                        name="company_logo"
                                        id="company_logo"
                                        value={formData.company_logo}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="https://example.com/logo.png"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* HR Contact */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">HR Contact</h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="hr_name" className="block text-sm font-medium text-gray-700">
                                        HR Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="hr_name"
                                        id="hr_name"
                                        required
                                        value={formData.hr_name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="e.g. Farhan Rahman"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="hr_email" className="block text-sm font-medium text-gray-700">
                                        HR Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="hr_email"
                                        id="hr_email"
                                        required
                                        defaultValue={user?.email}
                                        // value={formData.hr_email}
                                        // onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="e.g. hr@techsolutions.com"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Job Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                required
                                value={formData.description}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Describe the job role, responsibilities, and what you're looking for in a candidate..."
                            />
                        </div>

                        {/* Requirements */}
                        <div>
                            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                                Requirements
                            </label>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={requirementInput}
                                    onChange={(e) => setRequirementInput(e.target.value)}
                                    className="flex-1 border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Add a requirement (e.g. JavaScript)"
                                />
                                <button
                                    type="button"
                                    onClick={addRequirement}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Add
                                </button>
                            </div>

                            {formData.requirements.length > 0 && (
                                <div className="mt-2">
                                    <h4 className="text-sm font-medium text-gray-700 mb-1">Added Requirements:</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {formData.requirements.map((req, index) => (
                                            <li key={index} className="flex justify-between items-center">
                                                <span>{req}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeRequirement(index)}
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Responsibilities */}
                        <div>
                            <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700 mb-2">
                                Responsibilities
                            </label>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={responsibilityInput}
                                    onChange={(e) => setResponsibilityInput(e.target.value)}
                                    className="flex-1 border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Add a responsibility (e.g. Develop and maintain software)"
                                />
                                <button
                                    type="button"
                                    onClick={addResponsibility}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Add
                                </button>
                            </div>

                            {formData.responsibilities.length > 0 && (
                                <div className="mt-2">
                                    <h4 className="text-sm font-medium text-gray-700 mb-1">Added Responsibilities:</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {formData.responsibilities.map((resp, index) => (
                                            <li key={index} className="flex justify-between items-center">
                                                <span>{resp}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeResponsibility(index)}
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-5">
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Create Job Post
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobPostForm;
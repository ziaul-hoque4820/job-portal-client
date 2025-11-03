import React, { useState } from 'react';

function BannerSection() {
    const [searchQuery, setSearchQuery] = useState({
        jobTitle: '',
        location: '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        // Handle search functionality here
        console.log('Searching for:', searchQuery);
    };

    const stats = [
        { number: '10K+', label: 'Live Jobs' },
        { number: '5K+', label: 'Companies' },
        { number: '50K+', label: 'Candidates Hired' },
        { number: '95%', label: 'Success Rate' },
    ];

    return (
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="text-center lg:text-left lg:flex items-center justify-between">
                    {/* Left Content */}
                    <div className="lg:w-1/2 mb-12 lg:mb-0">
                        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                            Find Your
                            <span className="block text-yellow-300">Dream Job</span>
                            Today
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                            Discover thousands of job opportunities from top companies.
                            Start your career journey with our trusted job portal system.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center lg:text-left">
                                    <div className="text-2xl lg:text-3xl font-bold text-yellow-300">
                                        {stat.number}
                                    </div>
                                    <div className="text-blue-100 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center lg:justify-start space-x-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-sm">Verified Companies</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <span className="text-sm">Secure Platform</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Search Form */}
                    <div className="lg:w-1/2 lg:pl-12">
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                Find Your Perfect Job
                            </h3>

                            <form onSubmit={handleSearch} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Job Title or Keywords
                                    </label>
                                    <div className="relative">
                                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="e.g. Software Engineer, Marketing Manager"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                                            value={searchQuery.jobTitle}
                                            onChange={(e) => setSearchQuery({ ...searchQuery, jobTitle: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="e.g. New York, Remote, London"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                                            value={searchQuery.location}
                                            onChange={(e) => setSearchQuery({ ...searchQuery, location: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                                >
                                    Search Jobs
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-600 text-sm">
                                    Popular Searches:
                                    <span className="text-blue-600 ml-2">
                                        Developer, Designer, Marketing, Sales
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave Decoration */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" className="w-full">
                    <path fill="#ffffff" fillOpacity="1"
                        d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z">
                    </path>
                </svg>
            </div>
        </section>
    )
}

export default BannerSection
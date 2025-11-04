import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const statsVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3
            }
        }
    };

    const backgroundVariants = {
        hidden: { scale: 1.1, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1.2,
                ease: "easeOut"
            }
        }
    };

    const waveVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
                delay: 0.5
            }
        }
    };

    return (
        <motion.section
            className="relative bg-gradient-to-r from-blue-600/50 to-purple-700/50 text-white overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Animated Background */}
            <motion.div
                className="absolute inset-0 bg-black opacity-40"
                variants={backgroundVariants}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url("https://images.pexels.com/photos/7988758/pexels-photo-7988758.jpeg")`,
                    }}
                />
                {/* Animated overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-700/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                />
            </motion.div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="text-center lg:text-left lg:flex items-center justify-between">
                    {/* Left Content */}
                    <motion.div
                        className="lg:w-1/2 mb-12 lg:mb-0"
                        variants={textVariants}
                    >
                        <motion.h1
                            className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Find Your
                            <motion.span
                                className="block text-yellow-300"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                Dream Job
                            </motion.span>
                            Today
                        </motion.h1>

                        <motion.p
                            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Discover thousands of job opportunities from top companies.
                            Start your career journey with our trusted job portal system.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                            variants={statsVariants}
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center lg:text-left"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                >
                                    <div className="text-2xl lg:text-3xl font-bold text-yellow-300">
                                        {stat.number}
                                    </div>
                                    <div className="text-blue-100 text-sm">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div
                            className="flex items-center justify-center lg:justify-start space-x-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <motion.div
                                className="flex items-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-sm">Verified Companies</span>
                            </motion.div>
                            <motion.div
                                className="flex items-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <span className="text-sm">Secure Platform</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Search Form */}
                    <motion.div
                        className="lg:w-1/2 lg:pl-12"
                        variants={formVariants}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl p-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            whileHover={{
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.h3
                                className="text-2xl font-bold text-gray-800 mb-6 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                Find Your Perfect Job
                            </motion.h3>

                            <form onSubmit={handleSearch} className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.9 }}
                                >
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
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 1.0 }}
                                >
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
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.1 }}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Search Jobs
                                </motion.button>
                            </form>

                            <motion.div
                                className="mt-6 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                            >
                                <p className="text-gray-600 text-sm">
                                    Popular Searches:
                                    <span className="text-blue-600 ml-2">
                                        Developer, Designer, Marketing, Sales
                                    </span>
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Animated Wave Decoration */}
            <motion.div
                className="absolute bottom-0 left-0 right-0"
                variants={waveVariants}
            >
                <svg viewBox="0 0 1440 120" className="w-full">
                    <path fill="#ffffff" fillOpacity="1"
                        d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z">
                    </path>
                </svg>
            </motion.div>
        </motion.section>
    )
}

export default BannerSection;
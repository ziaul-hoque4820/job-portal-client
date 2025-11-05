import React from 'react'

function HowItWorks() {
    const steps = [
        {
            step: "01",
            title: "Create Account",
            description: "Sign up and create your professional profile",
            icon: "👤"
        },
        {
            step: "02",
            title: "Search Jobs",
            description: "Browse through thousands of job listings",
            icon: "🔍"
        },
        {
            step: "03",
            title: "Apply Now",
            description: "Submit your application with one click",
            icon: "📝"
        },
        {
            step: "04",
            title: "Get Hired",
            description: "Start your new career journey",
            icon: "🎯"
        }
    ];


    return (
        <section className="py-12 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                    <p className="text-gray-300 text-lg">Get your dream job in 4 simple steps</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center relative">
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-500 z-0"></div>
                            )}
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                                    {step.icon}
                                </div>
                                <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold absolute -top-2 -right-2">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-gray-300">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
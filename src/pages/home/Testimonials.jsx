import React from 'react'

function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Johnson",
            position: "Product Designer at Google",
            image: "👩",
            content: "I found my dream job through this platform. The application process was seamless and the job recommendations were spot on!",
            rating: 5
        },
        {
            name: "Michael Chen",
            position: "Software Engineer at Meta",
            image: "👨",
            content: "The quality of job listings here is exceptional. I received multiple offers within two weeks of signing up.",
            rating: 5
        },
        {
            name: "Emily Davis",
            position: "Marketing Director",
            image: "👩",
            content: "As a hiring manager, this platform has helped me find the best talent for my team. Highly recommended!",
            rating: 5
        }
    ];


    return (
        <section className="py-12 bg-gray-200">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
                    <p className="text-gray-600 text-lg">What our users say about us</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl mr-4">
                                    {testimonial.image}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                                </div>
                            </div>
                            <div className="flex mb-3">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <span key={i} className="text-yellow-400">⭐</span>
                                ))}
                            </div>
                            <p className="text-gray-700 italic">"{testimonial.content}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
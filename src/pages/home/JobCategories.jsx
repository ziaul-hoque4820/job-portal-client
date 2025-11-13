import React from 'react'

function JobCategories() {
    const categories = [
        { name: "Technology", count: "1,234", icon: "💻" },
        { name: "Marketing", count: "892", icon: "📈" },
        { name: "Design", count: "756", icon: "🎨" },
        { name: "Sales", count: "1,043", icon: "💰" },
        { name: "Healthcare", count: "654", icon: "🏥" },
        { name: "Education", count: "543", icon: "📚" },
        { name: "Finance", count: "876", icon: "💳" },
        { name: "Engineering", count: "987", icon: "⚙️" }
    ];

    return (
        <section className="py-12 bg-gray-200">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
                    <p className="text-gray-600 text-lg">Find jobs in your field of interest</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-blue-50 hover:border-blue-200 border border-transparent transition duration-300 cursor-pointer group">
                            <div className="text-3xl mb-3 group-hover:scale-110 transition duration-300">
                                {category.icon}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                            <p className="text-gray-500 text-sm">{category.count} jobs</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default JobCategories
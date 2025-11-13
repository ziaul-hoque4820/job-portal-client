import React from 'react'
import BannerSection from './BannerSection'
import HowItWorks from './HowItWorks'
import JobDetails from './JobDetails'
import Testimonials from './Testimonials'
import JobCategories from './JobCategories'

function Home() {
    return (
        <div>
            <BannerSection />
            <HowItWorks />
            <JobCategories />
            <JobDetails />
            <Testimonials />
        </div>
    )
}

export default Home

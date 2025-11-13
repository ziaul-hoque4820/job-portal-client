import React from 'react'
import BannerSection from './BannerSection'
import HowItWorks from './HowItWorks'
import JobDetails from './JobDetails'
import Testimonials from './Testimonials'

function Home() {
    return (
        <div>
            <BannerSection />
            <HowItWorks />
            <JobDetails />
            <Testimonials />
        </div>
    )
}

export default Home

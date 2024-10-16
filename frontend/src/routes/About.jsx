import React from 'react'
import PageHeader from '../components/Website/PageHeader'

const About = () => {
    return <div>
        <PageHeader title='About Us' subTitle='Duis aute irure dolor in reprehenderit in volurate velit cillum nulla pariatur nostrud exercitation.' />
        <div className="container my-4 p-4">
            <div className="row">
                <div className='w-100 mb-3 rounded-3' style={{ backgroundColor: '#FBAB7E', backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)', height: 300 }}></div>
                {/* <img className='w-100 mb-3 rounded-3' src="https://dummyimage.com/1200x350/09f00/fff&text=About Us" alt="" /> */}
                <p className='mb-3 text-justify'>Gaurav Bansal, an alumnus of IIT Kharagpur, and a teacher and practitioner of yoga, positive psychology, and ayurvedic nutrition, is the visionary behind PARAM. His professional journey led him to a pivotal realization: success in the conventional sense was insufficient for genuine and lasting fulfillment. This epiphany propelled him to explore various wellness strategies, yet he encountered a common pattern of initial improvement followed by stagnation and then diminishing of the results, which was clearly reflecting in the broader societal trend too.</p>
                <p className='mb-3 text-justify'>The turning point came when Gaurav met with Swami Janardhanananda Saraswati, a revered Himalayan Yoga and Vedanta master, in Uttarkashi. This mentorship illuminated the integral components of holistic well-being. Gaurav identified a prevalent shortfall in modern wellness practices: a myopic focus on isolated aspects of health, disregarding the essential interplay between physical, mental, vital, and material energies.</p>
                <p className='mb-3 text-justify'>Armed with this insight, Gaurav conceived PARAM as a platform to advocate for a comprehensive wellness paradigm rooted in the proven principles of Yoga, Ayurveda, Vedanta and Positive Psychology - a powerful combination of ancient wisdom and modern science. He posits that sustainable health and well-being are achievable through a harmonized approach to these core energies, moving beyond the superficial offerings of contemporary wellness trends. PARAM is the embodiment of this philosophy, committed to transform the quality of life of people, and the standard of holistic health practices across the globe.</p>
                <div className="mb-3">
                    <h4 className='fw-bold ls-normal'>Mission:</h4>
                    <p className='text-justify'>Our mission is to empower individuals to attain the peak of their well-being through holistic and sustainable approaches.</p>
                </div>
                <div className="mb-3">
                    <h4 className='fw-bold ls-normal'>Vision:</h4>
                    <p className='text-justify'>We envision becoming the premier, trusted source for genuine education and guidance on holistic well-being. Our commitment is to provide a foundation where individuals can discover, learn, and thrive in their journey toward complete wellness.</p>
                </div>
                <div className="mb-3">
                    <h4 className='fw-bold ls-normal'>Goal:</h4>
                    <p className='text-justify'>Our goal is to revolutionize the well-being of 1 million people by 2035, setting a new standard for holistic health on a global scale.</p>
                </div>

            </div>
        </div>
    </div>
}

export default About
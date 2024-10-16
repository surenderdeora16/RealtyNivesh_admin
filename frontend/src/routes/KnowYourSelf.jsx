import React from 'react'
import PageHeader from '../components/Website/PageHeader'
import { CorporateCard } from './programs/CorporateWellness'

const KnowYourSelf = () => {
    return (
        <section className="elementor-section elementor-top-section">
            <PageHeader title='Know YourSelf' subTitle='Tailor-made programs to enhance overall health, focus, and productivity, while boosting the team motivation, collaboration, and fulfilment at the workplace.' />
            <div className='container pt-5'>
                <div className="row">
                    <div className="col-12">
                        <h2 className='fs-4 fw-bold wp-block-heading pb-2'>Choose Quiz</h2>
                    </div>
                    <div className="col-md-6">
                        <CorporateCard
                            title="Prakruti Assessment Quiz"
                            subTitle="Discover your mind and body personality with this simple quiz to make smarter choices for a happier and healthier life."
                            image="https://dummyimage.com/500x200&text=Prakruti Assessment Quiz"
                            link='/know-yourself/prakruti-assessment-quiz'
                        />
                    </div>
                    <div className="col-md-6">
                        <CorporateCard
                            title="TOX level Assessment Quiz"
                            subTitle="Find out the TOXIN levels in your body with this simple quiz to know the status of your health."
                            image="https://dummyimage.com/500x200&text=TOX level Assessment Quiz"
                            link='/know-yourself/tox-level-assessment-quiz'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KnowYourSelf
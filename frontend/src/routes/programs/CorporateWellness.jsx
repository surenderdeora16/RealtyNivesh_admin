import React from 'react'
// import PageHeader from '../../components/Website/PageHeader'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'

const CorporateWellness = () => {
    return (
        <section className="elementor-section elementor-top-section">
            {/* <PageHeader title='Corporate Wellness' subTitle='Tailor-made programs to enhance overall health, focus, and productivity, while boosting the team motivation, collaboration, and fulfilment at the workplace.' /> */}
            <Carousel interval={2000} slide indicators={true}>
                <Carousel.Item>
                    <img className='w-100' src="https://dummyimage.com/1200x350.png/733635/fff" alt="" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className='w-100' src="https://dummyimage.com/1200x350.png/E52B50/fff" alt="" />
                </Carousel.Item>
            </Carousel>
            <div className='container pt-5'>
                <div className="row">
                    <div className="col-12">
                        <p className='mb-3 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate itaque voluptatibus nemo perferendis voluptas sequi omnis quidem eligendi eius fugit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur dolore quasi, fugit libero magnam tempora ab animi culpa quibusdam quia!</p>
                        <h2 className='fs-4 fw-bold wp-block-heading pb-2'>Our Programs</h2>
                    </div>
                    <div className="col-md-6">
                        <CorporateCard
                            title="Recharge"
                            subTitle="A power packed mini-workshop to supercharge your team's health, productivity, and workplace motivation."
                            image="https://dummyimage.com/500x200&text=Recharge"
                            link='/programs/corporate-wellness/recharge'
                        />
                    </div>
                    <div className="col-md-6">
                        <CorporateCard
                            title="In-Charge"
                            subTitle="A custom-designed unique offsite for corporate teams, offering a real boost to the physical, mental, and professional health."
                            image="https://dummyimage.com/500x200&text=In-Charge"
                            link='/programs/corporate-wellness/in-charge'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export const CorporateCard = ({ image = '', title = '', subTitle = '', link = '' }) => {
    return <div className="card">
        <div className="card-body">
            <h3 className='text-brown ls-normal text-center mb-3 fs-4 border-bottom pb-3'>{title}</h3>
            <p className='text-center' style={{ minHeight: 60 }}>{subTitle}</p>
            <img className='w-100 border border-2' src={image} alt={title} />
            <div className='w-100 mb-4 position-relative'>
                <Link to={link} className="btn-custom border border-2 position-absolute end-0" style={{ top: -20 }}>View Details</Link>
            </div>
        </div>
    </div>
}

export default CorporateWellness
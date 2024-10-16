import React, { useState } from 'react'
import PageHeader from '../../../components/Website/PageHeader'
import Modal from 'react-bootstrap/Modal';
import GetInTouch from '../../../components/Website/GetInTouch';

const ProgramDetails = () => {

    const [show, setShow] = useState(false);

    return (
        <>
            <PageHeader title='RECHARGE' subTitle='Transform your team’s energy and performance through this power packed in-house mini-workshop designed to boost your team’s health, focus, productivity, motivation, and fulfilment.' />
            <div className="blog-details-area program-details">
                <div className="container yogastic-page-container py-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className='mb-3'>
                                <h5 className='my-3 pb-2 fw-bold wp-block-heading text-brown'>Key Highlights:</h5>
                                <ul className='custom-list'>
                                    <li>Intro to powerful Holistic Wellness Approach</li>
                                    <li>Success Mindset & Goal setting training</li>
                                    <li>Techniques to improve focus and productivity</li>
                                    <li>Tools to boost motivation and work satisfaction</li>
                                    <li>Yogic Techniques for improving strength and stamina</li>
                                    <li>Interactive session on Nutrition</li>
                                </ul>
                            </div>

                            <div className='mb-3'>
                                <h5 className='my-3 pb-2 fw-bold wp-block-heading text-brown'>Benefits:</h5>
                                <ul className='custom-list'>
                                    <li>Renewed motivation and energy levels</li>
                                    <li>Reduction in stress, anxiety, and fatigue levels</li>
                                    <li>Improvement in focus and productivity</li>
                                    <li>Easy to follow guidelines for boosting health</li>
                                    <li>Easy tips for continued progress post workshop</li>
                                </ul>
                            </div>

                            <div className="mb-3">
                                <p className='mb-2'><strong>Duration : </strong> 8-hour session, split over two days into two 4-hour sessions each.</p>
                                <p className='mb-2'><strong>Location : </strong> In office.</p>
                            </div>

                            <div className='d-flex flex-column align-items-center gap-3 py-3 my-3'>
                                <span role='button' onClick={() => setShow(true)} className='elementor-button elementor-button-link elementor-size-sm elementor-animation-float bg-theme'>More Questions? Request A Call Back</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal centered show={show} onHide={() => setShow(false)} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Submit your Query</Modal.Title>
                </Modal.Header>
                <Modal.Body className='form-outer p-0'>
                    <section
                        className="px-0 elementor-section elementor-inner-section elementor-element elementor-element-69d471b form-outer elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                        <div className="elementor-container elementor-column-gap-no">
                            <GetInTouch width='full' buttonText="Submit" submitWrapper="text-center" type={4} onSuccess={() => setShow(false)} />
                        </div>
                    </section>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProgramDetails
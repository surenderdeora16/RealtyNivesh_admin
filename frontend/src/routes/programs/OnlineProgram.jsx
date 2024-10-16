import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/Website/PageHeader'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPackges } from '../../redux/online-program/onlineProgramSlice'
import GetInTouch from '../../components/Website/GetInTouch';

const OnlineProgram = () => {

    const dispatch = useDispatch();
    const { packages } = useSelector(store => store.onlineProgram);
    const [show, setShow] = useState(false);

    useEffect(() => { packages.length === 0 && dispatch(fetchPackges()) }, [])

    return (
        <section className="elementor-section elementor-top-section">
            <PageHeader title='Wellness Retreats' subTitle='Scientifically crafted wellness programs, where the timeless wisdom of Yoga and Ayurveda meets the practical applications of modern science to rejuvenate and re- energise you inside out, catalyzing profound transformations and bringing out the best within you.' />

            <div className="blog-details-area program-details">
                <div className="container yogastic-page-container py-4">
                    <div>
                        <p>YOGYA is our signature online program designed to guide you further in your holistic wellness journey from the comfort of your home. Yogya is so much more than a typical yoga class. It is designed to ensure you keep improving not just your physical health, but also your mental, emotional, and spiritual well-being.</p>
                        <h5 className='my-3 pb-2 fw-bold wp-block-heading text-brown'>What you get:</h5>
                        <ul className='custom-list'>
                            <li>12 yoga & pranayama sessions per month</li>
                            <li>4 Meditation session per month</li>
                            <li>4 expert session on nutrition / life-skill coaching per month</li>
                            <li>Personal ayurvedic diet recommendation per quarter</li>
                            <li>Connect with like-minded community</li>
                        </ul>
                    </div>

                    <div className="mb-3">
                        <p className='mb-2'><strong>Price: </strong></p>
                        <div className='mb-3'>
                            <h4 className="fw-bold">Indian Nationals :</h4>
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Group</th>
                                        <th scope="col">Individual</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {packages?.map(pkg => (
                                        <tr key={pkg?.id}>
                                            <td>{pkg?.duration}</td>
                                            <td>{pkg?.group_inr ? `Rs. ${pkg?.group_inr}` : ''}</td>
                                            <td>{pkg?.individual_inr ? `Rs. ${pkg?.individual_inr}` : ''}</td>
                                        </tr>
                                    ))}
                                    {packages?.length === 0 && <tr><td colSpan="100" className='text-danger text-center'>No data available..</td></tr>}
                                </tbody>
                                <caption><strong>Note : </strong> These prices are exclusive of 18% tax as GST.</caption>
                            </table>
                        </div>

                        <div className='mb-3'>
                            <h4 className="fw-bold">Foreign Nationals :</h4>
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Group</th>
                                        <th scope="col">Individual</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {packages?.map(pkg => (
                                        <tr key={pkg?.id}>
                                            <td>{pkg?.duration}</td>
                                            <td>{pkg?.group_usd ? `USD ${pkg?.group_usd}` : ''}</td>
                                            <td>{pkg?.individual_usd ? `USD ${pkg?.individual_usd}` : ''}</td>
                                        </tr>
                                    ))}
                                    {packages?.length === 0 && <tr><td colSpan="100" className='text-danger text-center'>No data available..</td></tr>}
                                </tbody>
                                <caption><strong>Note : </strong> These prices are exclusive of 18% tax as GST.</caption>
                            </table>
                        </div>
                    </div>

                    <div className='d-flex flex-column align-items-center gap-3 py-3'>
                        <Link to={'/user/programs/online-programs/booking'}><button className='wpcf7-form-control wpcf7-submit has-spinner py-3 px-4'>Book Your Plan</button></Link>
                        <Link to="/contact-us">Book a demo</Link>
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
        </section>
    )
}

export default OnlineProgram
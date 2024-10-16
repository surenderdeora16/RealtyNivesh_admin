import { Carousel } from 'react-bootstrap'
import { TESTIMONIAL } from '../data/constant'
import { LeftDesignTestimonial, RightDesignTestimonial } from '../assets/images'

const Testimonial = () => {
    return (
        <section className="elementor-section elementor-top-section elementor-element elementor-element-c81621b elementor-section-full_width elementor-section-height-default elementor-section-height-default">
            <div className="elementor-container elementor-column-gap-no">
                <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-6c5d21f">
                    <div className="elementor-widget-wrap elementor-element-populated">
                        <div className="elementor-element elementor-element-568887a elementor-widget__width-auto elementor-absolute elementor-widget-tablet__width-initial elementor-hidden-mobile elementor-hidden-tablet elementor-invisible elementor-widget elementor-widget-image animate__animated animate__fadeIn">
                            <div className="elementor-widget-container">
                                <img width={205} height={276} src={LeftDesignTestimonial} className="attachment-full size-full wp-image-1581" alt="" />
                            </div>
                        </div>
                        <div className="elementor-element elementor-element-81ff99d elementor-widget__width-auto elementor-absolute elementor-widget-tablet__width-initial elementor-hidden-mobile elementor-invisible elementor-widget elementor-widget-image animate__animated animate__fadeIn">
                            <div className="elementor-widget-container">
                                <img width={210} height={276} src={RightDesignTestimonial} className="attachment-full size-full wp-image-1582" alt="" />
                            </div>
                        </div>
                        <section className="elementor-section elementor-inner-section elementor-element elementor-element-f5ea95e elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                            <div className="elementor-container elementor-column-gap-no">
                                <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-4518d60 elementor-invisible animate__animated animate__fadeInUp">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-3e07d21 elementor-widget elementor-widget-testimonial" data-widget_type="testimonial.default">
                                            <div className="elementor-widget-container">
                                                <section className="testimonial-section w-100 float-left d-table">
                                                    <div className="container">
                                                        <Carousel
                                                            slide
                                                            indicators={null}
                                                            interval={3000}
                                                            className='pagination-outer'
                                                            prevIcon={<div className='pagination-outer'><i className="fs-2 fas fa-arrow-left" /><span className="sr-only">Previous</span></div>}
                                                            nextIcon={<div className='pagination-outer'><i className="fs-2 fas fa-arrow-right" /><span className="sr-only">Next</span></div>}
                                                        >
                                                            {TESTIMONIAL.map((row, i) => {
                                                                return <Carousel.Item key={i}>
                                                                    <div className="content-box">
                                                                        <figure className="testimonial_content mb-3">
                                                                            <i className="fa-duotone fa-comment-quote text-brown" style={{ fontSize: 100 }}></i>
                                                                        </figure>
                                                                        <div className="testimonial_paragraph">
                                                                            <p>“{row.comments}”</p>
                                                                        </div>
                                                                        <figure className="img-fluid">
                                                                            <img width={93} height={93} src={row.image} className="attachment-full size-full" alt="" />
                                                                        </figure>
                                                                        <span className="testimonial_person_name">{row.name} </span><br />
                                                                        <span className="department_name">{row.designation}</span>
                                                                    </div>

                                                                </Carousel.Item>
                                                            })}
                                                        </Carousel>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div >
                </div >
            </div >
        </section >
    )
}

export default Testimonial
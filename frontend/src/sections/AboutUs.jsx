import React from 'react'
import { AboutUsDesign, AboutUsGirl } from '../assets/images'
import { Link } from 'react-router-dom'

const AboutUs = () => {
    return (
        <section className="elementor-section elementor-top-section elementor-element elementor-element-2ebbd50 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
            <div className="elementor-container elementor-column-gap-no">
                <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-56dba70">
                    <div className="elementor-widget-wrap elementor-element-populated">
                        <section className="elementor-section elementor-inner-section elementor-element elementor-element-bf6f5df elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                            <div className="elementor-container elementor-column-gap-no">
                                <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-fdb303c">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-db50736 elementor-widget__width-auto elementor-invisible elementor-widget elementor-widget-image animate__animated animate__fadeInLeft">
                                            <div className="elementor-widget-container">
                                                <img width={570} height={682} src={AboutUsGirl} className="attachment-full size-full wp-image-708" alt="" />
                                            </div>
                                        </div>
                                        <div className="elementor-element elementor-element-a5e52e3 elementor-widget__width-auto elementor-absolute elementor-hidden-tablet elementor-hidden-mobile elementor-invisible elementor-widget elementor-widget-image animate__animated animate__zoomIn animate__delay-4s">
                                            <div className="elementor-widget-container">
                                                <img width={297} height={361} src={AboutUsDesign} className="attachment-full size-full wp-image-715" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-4f38ea1">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-ee7e3ce elementor-invisible elementor-widget elementor-widget-heading animate__animated animate__fadeInRight">
                                            <div className="elementor-widget-container">
                                                <h4 className="elementor-heading-title elementor-size-default">
                                                    ABOUT US
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="elementor-element elementor-element-b84619f elementor-widget elementor-widget-heading">
                                            <div className="elementor-widget-container">
                                                <h2 className="elementor-heading-title elementor-size-default">
                                                    Take Your Yoga to the Next Level
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="elementor-element elementor-element-9221f11 elementor-widget elementor-widget-text-editor">
                                            <div className="elementor-widget-container lh-normal text-justify mb-3">
                                                Gaurav Bansal, an alumnus of IIT Kharagpur, and a teacher and practitioner of yoga, positive psychology, and ayurvedic nutrition, is the visionary behind PARAM. His professional journey led him to a pivotal realization: success in the conventional sense was insufficient for genuine and lasting fulfillment. This epiphany propelled him to explore various wellness strategies, yet he encountered a common pattern of initial improvement followed by stagnation and then diminishing of the results, which was clearly reflecting in the broader societal trend too.
                                            </div>
                                        </div>
                                        {/* <div className="elementor-element elementor-element-5c87f30 heading-inner elementor-widget elementor-widget-text-editor">
                                            <div className="elementor-widget-container">
                                                Modi tempora incidunt ut labore dolore magnam aliquam
                                                auerat
                                                volutaem. </div>
                                        </div> */}
                                        <div className="elementor-element elementor-element-a8004d8 elementor-widget__width-auto elementor-widget elementor-widget-button">
                                            <div className="elementor-widget-container">
                                                <div className="elementor-button-wrapper">
                                                    <Link to="/about" className="elementor-button elementor-button-link elementor-size-sm elementor-animation-float">
                                                        <span className="elementor-button-content-wrapper">
                                                            <span className="elementor-button-text">Read More</span>
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
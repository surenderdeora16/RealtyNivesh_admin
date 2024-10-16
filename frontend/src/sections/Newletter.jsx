import React from 'react'
import { ServicesDesign } from '../assets/images'

const Newletter = () => {
    return (
        <section className="mt-5 elementor-section elementor-top-section elementor-element elementor-element-5d2eaa95 elementor-section-full_width elementor-section-height-default elementor-section-height-default">
            <div className="elementor-container elementor-column-gap-no">
                <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-6b4db89a">
                    <div className="elementor-widget-wrap elementor-element-populated">
                        <div className="elementor-element elementor-element-34fe3b08 elementor-widget__width-auto elementor-absolute elementor-widget-tablet__width-initial elementor-hidden-mobile elementor-hidden-tablet elementor-invisible elementor-widget elementor-widget-image animate__animated animate__fadeIn animate__delay-3s">
                            <div className="elementor-widget-container">
                                <img width={321} height={353} src={ServicesDesign} className="attachment-full size-full wp-image-418" alt="" />
                            </div>
                        </div>
                        <section className="elementor-section elementor-inner-section elementor-element elementor-element-24263613 elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-invisible animate__animated animate__fadeInUp">
                            <div className="elementor-container elementor-column-gap-no">
                                <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-76821ac">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <section className="elementor-section elementor-inner-section elementor-element elementor-element-1c31eb5b Subscribe-form-outer elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                                            <div className="elementor-container elementor-column-gap-no">
                                                <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-5936735f">
                                                    <div className="elementor-widget-wrap elementor-element-populated">
                                                        <div className="elementor-element elementor-element-1857db2 elementor-widget elementor-widget-heading">
                                                            <div className="elementor-widget-container">
                                                                <h4 className="elementor-heading-title elementor-size-default">
                                                                    SUBSCRIBE NOW</h4>
                                                            </div>
                                                        </div>
                                                        <div className="elementor-element elementor-element-2690f6cb elementor-widget elementor-widget-heading">
                                                            <div className="elementor-widget-container">
                                                                <h2 className="elementor-heading-title elementor-size-default">
                                                                    Get the Latest Updates With Our Newletter</h2>
                                                            </div>
                                                        </div>
                                                        <div className="elementor-element elementor-element-6e632398 Subscribe-form-inner elementor-widget elementor-widget-shortcode" data-widget_type="shortcode.default">
                                                            <div className="elementor-widget-container">
                                                                <div className="elementor-shortcode">
                                                                    <div className="wpcf7 no-js" id="wpcf7-f6279-o2" lang="en-US" dir="ltr">
                                                                        <div className="screen-reader-response">
                                                                            <p role="status" aria-live="polite" aria-atomic="true" />
                                                                            <ul />
                                                                        </div>
                                                                        <form action="/yogastic/#wpcf7-f6279-o2" method="post" className="wpcf7-form init" aria-label="Contact form" noValidate="novalidate" data-status="init">
                                                                            <p><label><br />
                                                                                <span className="wpcf7-form-control-wrap" data-name="your-email">
                                                                                    <input size={40} className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" autoComplete="email" aria-required="true" aria-invalid="false" placeholder="Enter Your Email" type="email" name="your-email" /></span>
                                                                            </label><br />
                                                                                <input className="wpcf7-form-control wpcf7-submit has-spinner" type="submit" value="Subscribe" />
                                                                            </p>
                                                                            <div className="wpcf7-response-output" aria-hidden="true">
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-42913b81 elementor-hidden-mobile">
                                                    <div className="elementor-widget-wrap">
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
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

export default Newletter
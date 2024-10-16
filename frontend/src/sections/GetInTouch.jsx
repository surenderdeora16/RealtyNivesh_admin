import React from 'react'
import { ContactSectionDesign } from '../assets/images'
import GetInTch from "../components/Website/GetInTouch"

const GetInTouch = () => {
    return (
        <section className="elementor-section elementor-top-section elementor-element elementor-element-52ebe4a elementor-section-full_width video-outer elementor-section-height-default elementor-section-height-default">
            <div className="elementor-container elementor-column-gap-no">
                <div className="elementor-column  elementor-top-column elementor-element">
                    <div className="elementor-widget-wrap elementor-element-populated">
                        <div className="elementor-element elementor-element-7cd000b elementor-widget__width-auto elementor-absolute elementor-hidden-tablet elementor-hidden-mobile elementor-invisible elementor-widget elementor-widget-image animate__animated animate__fadeInLeft">
                            <div className="elementor-widget-container">
                                <img width={367} height={384} src={ContactSectionDesign} className="attachment-full size-full wp-image-1188" alt="" />
                            </div>
                        </div>
                        <section className="elementor-section elementor-inner-section elementor-element elementor-element-637ba93 form-outer elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                            <div className="elementor-container elementor-column-gap-no">
                                <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-596d84f elementor-hidden-tablet elementor-hidden-mobile elementor-hidden-laptop">
                                    <div className="elementor-widget-wrap">
                                    </div>
                                </div>
                                <GetInTch
                                    heading=""
                                    subheading="Contact Us"
                                    description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat dicta magnam incidunt ullam sunt molestias ratione, autem exercitationem nihil quibusdam!"
                                    formId="wpcf7-f6280-p6302-o1"
                                    width={'full'}
                                    type={1}
                                    buttonMain="main4"
                                    buttonText="Get Started"
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GetInTouch
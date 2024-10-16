import React from 'react'
import PageHeader from '../components/Website/PageHeader'
import GetInTouch from '../components/Website/GetInTouch'

const JoinUs = () => {
    return (
        <>
            <PageHeader title='Join Us' subTitle='PARAM is not just a wellness brand; it’s a social movement driven by a collective of experienced and passionate individuals dedicated to making a lasting impact on the world, through holistic health and wellbeing. Our mission is to inspire, nurture, and innovate for healthier communities everywhere. If you’re driven by a purpose that transcends the ordinary, we invite you to join us in this revolutionary journey.' />
            <div data-elementor-type="wp-page" data-elementor-id={2851} className="elementor elementor-2851 ">
                <section className="elementor-section elementor-top-section  elementor-element elementor-element-4ba9f2f elementor-section-boxed elementor-section-height-default elementor-section-height-default send_us_msg px-3 px-md-0" data-id="4ba9f2f" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;navigation&quot;:&quot;both&quot;}">
                    <h4 className="elementor-heading-title elementor-size-default text-center">
                        Get In Touch
                    </h4>
                    <div className="container elementor-container elementor-column-gap-no">
                        <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-0ceb9ad" data-id="0ceb9ad" data-element_type="column">
                            <div className="elementor-widget-wrap elementor-element-populated">
                                <section className="px-0 px-lg-3 elementor-section elementor-inner-section elementor-element elementor-element-69d471b form-outer elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="69d471b" data-element_type="section" data-settings="{&quot;navigation&quot;:&quot;both&quot;}">
                                    <div className="elementor-container elementor-column-gap-no">
                                        <GetInTouch
                                            heading=""
                                            subheading="Join the team"
                                            description="If you have an expertise that you feel can help us in our mission, let’s get in touch and explore the possibilities together!"
                                            formId="wpcf7-f6280-p2851-o1"
                                            type={2}
                                            buttonMain="main4"
                                            buttonText="Get Started"
                                        />

                                        <GetInTouch
                                            heading=""
                                            subheading="Partner with us"
                                            description="If you are a business and you see a business synergy which can help us both make better impact, we would love to hear from you and explore the opportunities!"
                                            formId="wpcf7-f6280-p2851-o1"
                                            type={3}
                                            buttonMain="main4"
                                            buttonText="Get Started"
                                        />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default JoinUs
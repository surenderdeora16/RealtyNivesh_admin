import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { CAROUSELDATAHOME } from '../data/constant';
import { HeroImage, HeroLeft, HeroRight, YogaticArrow } from '../assets/images';

const Hero = () => {
    return (
        <section className="elementor-section elementor-top-section elementor-element elementor-element-6f363af elementor-section-full_width elementor-section-height-min-height elementor-section-height-default elementor-section-items-middle">
            <div className="elementor-background-overlay" />
            <div className="elementor-container elementor-column-gap-no">
                <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-fe674e6">
                    <div className="elementor-widget-wrap elementor-element-populated">
                        <div className="elementor-element elementor-element-c1bc07d elementor-widget__width-auto elementor-absolute elementor-widget-tablet__width-initial elementor-hidden-mobile elementor-invisible elementor-widget elementor-widget-image animate__animated animate__fadeIn animate__delay-2s position-absolute">
                            <div className="elementor-widget-container">
                                <img width={233} height={236} src={HeroLeft} className="attachment-full size-full wp-image-210" alt="" />
                            </div>
                        </div>
                        <div className="elementor-element elementor-element-a40b471 elementor-widget__width-auto elementor-absolute elementor-widget-tablet__width-initial elementor-hidden-mobile elementor-invisible elementor-widget elementor-widget-image animate__animated animate__fadeIn animate__delay-2s">
                            <div className="elementor-widget-container">
                                <img width={193} height={267} src={HeroRight} className="attachment-full size-full wp-image-223" alt="" />
                            </div>
                        </div>
                        <section className="elementor-section elementor-inner-section elementor-element elementor-element-ed871aa elementor-section-full_width elementor-section-height-default elementor-section-height-default">
                            <div className="elementor-container elementor-column-gap-no">
                                <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-0371f18" data-element_type="column">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-c3ecf7a elementor-widget elementor-widget-banner-sliders">
                                            <div className="elementor-widget-container">
                                                <section className="banner-con w-100 float-left d-table">
                                                    <div className="d-table-cell align-middle">
                                                        <div className="container">
                                                            <Carousel prevIcon={null} nextIcon={null} interval={null} >
                                                                {CAROUSELDATAHOME.map((row, i) => (
                                                                    <Carousel.Item key={i}>
                                                                        <div className="banner_content">
                                                                            <h5 className="elementor-heading-title elementor-size-default">{row.title}</h5>
                                                                            <h2 className="text-white mb-4" >{row.subTitle}</h2>
                                                                            <p>{row.description}</p>
                                                                            <div className="banner-button list-inline btn_wrapper">
                                                                                <div className="primary-button list-inline-item text-decoration-none getstarted_btn">
                                                                                    <Link href={row.path} className="primary-btn button-effect">Get Started</Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Carousel.Item>
                                                                ))}
                                                            </Carousel>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                        <div className="elementor-element elementor-element-8ecfacf elementor-widget__width-auto elementor-absolute elementor-widget elementor-widget-image">
                                            <div className="elementor-widget-container">
                                                <a href="#footer">
                                                    <img src={YogaticArrow} title="yogatic-arrow" alt="yogatic-arrow" className="elementor-animation-pulse" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-5e8b7e5">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-a7db6a3 elementor-invisible elementor-widget elementor-widget-image animate__animated animate__fadeInRight">
                                            <div className="elementor-widget-container text-center">
                                                <img width={683} height={732} src={HeroImage} className="elementor-animation-bob attachment-full size-full wp-image-313" alt="" />
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

export default Hero
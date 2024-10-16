import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { OURSIGNATUREPROGRAMS } from "../data/constant";
import { strLimit } from "../data/helpers";
import { Link } from "react-router-dom";
import { BlogImage1 } from "../assets/images";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 768 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 768, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const OurServices = () => {
    return (
        <section className="elementor-section elementor-top-section elementor-element elementor-element-7d0bbf3 elementor-section-full_width elementor-section-height-default elementor-section-height-default border-bottom">
            <div className="elementor-container elementor-column-gap-no">
                <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-d5958c8">
                    <div className="elementor-widget-wrap elementor-element-populated">
                        <section className="elementor-section elementor-inner-section elementor-element elementor-element-9715243 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                            <div className="elementor-container elementor-column-gap-no">
                                <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-a102a54">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-0bd3209 elementor-invisible elementor-widget elementor-widget-heading animate__animated animate__fadeInDown">
                                            <div className="elementor-widget-container">
                                                <h4 className="elementor-heading-title elementor-size-default">
                                                    OUR OFFERINGS
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="elementor-element elementor-element-14a5904 elementor-widget elementor-widget-heading">
                                            <div className="elementor-widget-container">
                                                <h2 className="elementor-heading-title elementor-size-default">
                                                    Our Signature Programs
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="elementor-element elementor-element-361ac79 elementor-widget elementor-widget-text-editor">
                                            {/* <div className="elementor-widget-container">
                                                Scientifically crafted wellness programs, where the timeless wisdom of Yoga and Ayurveda meets the practical applications of modern science to rejuvenate and re-energise you inside out, catalyzing profound transformations and bringing out the best within you.
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="mt-5 elementor-section elementor-inner-section elementor-element elementor-element-26f453b elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                            <div className="elementor-container elementor-column-gap-no">
                                <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-ad3f773">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-3b9f536 elementor-widget elementor-widget-services-slider">
                                            <div className="elementor-widget-container">
                                                <div className="our-services row justify-content-center">
                                                    <div className="col-lg-10 col-md-12 col-12">
                                                        <Carousel
                                                            responsive={responsive}
                                                            infinite={true}
                                                            autoPlay={false}
                                                            gap={20}
                                                            arrows={false}
                                                            renderButtonGroupOutside={true}
                                                            customButtonGroup={<ButtonGroup />}
                                                        >
                                                            {
                                                                OURSIGNATUREPROGRAMS.map((row, i) => (
                                                                    <div className="item mx-auto" key={i} style={{ maxWidth: 285 }}>
                                                                        <div className="services_box_content">
                                                                            <div className="services_box_lower_portion">
                                                                                <figure className="mb-0">
                                                                                    <img src={BlogImage1} alt="" className="img-fluid" />
                                                                                </figure>
                                                                                <h3 className="heading_title h4">{row.title}</h3>
                                                                                <div className="content_color">{strLimit(row.subTitle, 90)}</div>
                                                                                <div className="btn_wrapper">
                                                                                    <Link to={row.path} className="text-decoration-none"><i className="fas fa-arrow-right" aria-hidden="true" /></Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </Carousel>
                                                    </div>
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

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
        <div className="d-lg-none d-flex justify-content-center align-items-center py-4">
            <button onClick={() => previous()} type="button" role="presentation" className="owl-btn owl-prev-custom">
                <span aria-label="Previous">‹</span>
            </button>
            <button onClick={() => next()} type="button" role="presentation" className="owl-btn owl-next-custom">
                <span aria-label="Next">›</span>
            </button>
        </div>
    );
};

export default OurServices
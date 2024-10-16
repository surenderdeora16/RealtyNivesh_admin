import React from 'react'
import { BlogImage1, BlogImage2, BlogImage3, OurSpecialitiesDesign } from '../assets/images'

const OurNewsFeed = () => {
    return (
        <section className="elementor-section elementor-top-section elementor-element elementor-element-349971d elementor-section-full_width elementor-section-height-default elementor-section-height-default" id="footer">
            <div className="elementor-container elementor-column-gap-no">
                <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-58cfe8c">
                    <div className="elementor-widget-wrap elementor-element-populated">
                        <section className="elementor-section elementor-inner-section elementor-element elementor-element-4b49a24 elementor-section-boxed elementor-section-height-default elementor-section-height-default" id="blog_post">
                            <div className="elementor-container elementor-column-gap-no">
                                <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-e48bafe">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-8627505 elementor-invisible elementor-widget elementor-widget-heading animate__animated animate__fadeInDown">
                                            <div className="elementor-widget-container">
                                                <h4 className="elementor-heading-title elementor-size-default">
                                                    BLOG POSTS</h4>
                                            </div>
                                        </div>
                                        <div className="elementor-element elementor-element-0b8a30d elementor-widget elementor-widget-heading">
                                            <div className="elementor-widget-container">
                                                <h2 className="elementor-heading-title elementor-size-default">
                                                    Our News Feed</h2>
                                            </div>
                                        </div>
                                        <div className="elementor-element elementor-element-0d72410 elementor-widget elementor-widget-text-editor">
                                            <div className="elementor-widget-container">
                                                Autem vel eum iure reprehenderit qui in ea voluptate
                                                velit
                                                esse quam nihil molestiae consequatur vel illum qui
                                                dolorem
                                                eum fugiat </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="elementor-element elementor-element-746b48e elementor-widget__width-auto elementor-absolute elementor-widget-tablet__width-initial elementor-hidden-mobile elementor-hidden-tablet elementor-invisible elementor-widget elementor-widget-image animate__animated animate__fadeIn animate__delay-4s">
                            <div className="elementor-widget-container">
                                <img width={322} height={353} src={OurSpecialitiesDesign} className="attachment-full size-full wp-image-1160" alt="" />
                            </div>
                        </div>
                        <section className="elementor-section elementor-inner-section elementor-element elementor-element-60215c3 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                            <div className="elementor-container elementor-column-gap-default">
                                <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-6f191cf">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-58c2a52 elementor-widget elementor-widget-home-blog" data-widget_type="home-blog.default">
                                            <div className="elementor-widget-container">
                                                <section className="blog-section position-relative">
                                                    <div className="row aos-init aos-animate" data-aos="fade-up">
                                                        <section className="col-md-6 blog_posts_section">
                                                            <div className="row" data-aos="fade-up">
                                                                <div className="blog_posts_image position-relative">
                                                                    <figure className="mb-0"><img src={BlogImage2} alt="" className="img-fluid" />
                                                                    </figure>
                                                                    <div className="blog_posts_image_content">
                                                                        <span> Yogastiic</span>
                                                                        <h4 className="heading_title">
                                                                            Finding
                                                                            Inner Peace through Yoga and
                                                                            Meditation</h4>
                                                                        <div className="icon_wrapper">
                                                                            <a href="!#" className="text-decoration-none"><i className="fas fa-arrow-right" aria-hidden="true" /></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </section>
                                                        <section className="col-md-6 blog_posts_section">
                                                            <div className="row" data-aos="fade-up">
                                                                <div className="blog_posts_image position-relative">
                                                                    <figure className="mb-0">
                                                                        <img decoding="async" src={BlogImage1} alt="" className="img-fluid" />
                                                                    </figure>
                                                                    <div className="blog_posts_image_content">
                                                                        <span> Yogastiic</span>
                                                                        <h4 className="heading_title">Yogic
                                                                            Breathing Techniques
                                                                            (Pranayama)
                                                                        </h4>
                                                                        <div className="icon_wrapper">
                                                                            <a href="!#" className="text-decoration-none"><i className="fas fa-arrow-right" aria-hidden="true" /></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                </section>
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

export default OurNewsFeed
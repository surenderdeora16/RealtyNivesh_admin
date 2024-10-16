import { Link } from 'react-router-dom';
import { FooterDesign } from '../assets/images';
import { FOOTER_LINKS } from '../data/constant';
import { useSelector } from 'react-redux';

const FooterLinks = () => {

    const { footer_logo, email, phone, address, facebook, linkedin, instagram } = useSelector(store => store.theme.settings);

    return (
        <section className="elementor-section elementor-top-section elementor-element elementor-element-e34fbbc elementor-section-full_width elementor-section-height-default elementor-section-height-default">
            <div className="elementor-container elementor-column-gap-no">
                <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-1bad3896">
                    <div className="overflow-hidden elementor-widget-wrap elementor-element-populated">
                        <div className="elementor-element elementor-element-227e118d elementor-widget__width-auto elementor-absolute elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-image">
                            <div className="elementor-widget-container">
                                <img width={377} height={462} src={FooterDesign} className="attachment-full size-full wp-image-3867" alt="" />
                            </div>
                        </div>
                        <section className="elementor-section elementor-inner-section elementor-element elementor-element-16ac57c2 elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                            <div className="elementor-container elementor-column-gap-no">
                                <div className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-795e052c">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-42f0433 elementor-widget__width-auto elementor-widget elementor-widget-image">
                                            <div className="elementor-widget-container">
                                                <Link to="/home">
                                                    <img width={125} height={104} src={footer_logo} className="attachment-full size-full wp-image-3868" alt="" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-3e0ff772">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-6c91c1e8 elementor-hidden-mobile elementor-widget elementor-widget-heading">
                                            <div className="elementor-widget-container">
                                                <h3 className="elementor-heading-title elementor-size-default">
                                                    About Us</h3>
                                            </div>
                                        </div>
                                        <div className="elementor-element elementor-element-664d7611 elementor-widget elementor-widget-text-editor">
                                            <div className="elementor-widget-container">
                                                Quisuam est rui dolorem ipsum quia dolor sit amet,
                                                consectetur adipisci velit sea… </div>
                                        </div>
                                        <div className="d-block elementor-element elementor-element-77b58488 elementor-shape-square elementor-grid-3 elementor-widget__width-auto elementor-hidden-laptop elementor-hidden-tablet elementor-hidden-mobile e-grid-align-left elementor-widget elementor-widget-social-icons">
                                            <div className="elementor-widget-container">
                                                <div className="elementor-social-icons-wrapper elementor-grid">

                                                    <span  className="elementor-grid-item">
                                                        <a style={{ fontSize: 'unset' }} className="elementor-icon  elementor-social-icon" href={facebook} target="_blank">
                                                            <i style={{padding: '25px'}} className="d-flex fab fa-facebook-f text-secondary" />
                                                        </a>
                                                    </span>
                                                    <span  className="elementor-grid-item">
                                                        <a style={{ fontSize: 'unset' }} className="elementor-icon  elementor-social-icon" href={instagram} target="_blank">
                                                            <i style={{padding: '25px'}} className="d-flex fab fa-instagram text-secondary" />
                                                        </a>
                                                    </span>
                                                    <span  className="elementor-grid-item">
                                                        <a style={{ fontSize: 'unset' }} className="elementor-icon  elementor-social-icon" href={linkedin} target="_blank">
                                                            <i style={{padding: '25px'}} className='d-flex fab fa-linkedin-in text-secondary' />
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-block my-lg-0 my-5 text-center text-lg-start elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-203e5390 elementor-hidden-tablet elementor-hidden-mobile">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-5d4247da elementor-widget elementor-widget-heading">
                                            <div className="elementor-widget-container">
                                                <h3 className="elementor-heading-title elementor-size-default">
                                                    Quick Links</h3>
                                            </div>
                                        </div>
                                        <div className="elementor-element elementor-element-7e2fe708 elementor-align-left elementor-tablet-align-left elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list">
                                            <div className="elementor-widget-container">
                                                <ul className="elementor-icon-list-items text-center text-lg-start">
                                                    {FOOTER_LINKS.map(({ link, label }, i) => <li key={i} className="elementor-icon-list-item">
                                                        <Link to={link}>
                                                            <span className="elementor-icon-list-text">{label}</span>
                                                        </Link>
                                                    </li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-4fefa61a elementor-hidden-mobile">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-6ca2ea7a elementor-widget elementor-widget-heading">
                                            <div className="elementor-widget-container">
                                                <h3 className="elementor-heading-title elementor-size-default">
                                                    Contact Info
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="elementor-element elementor-element-3d77be55 elementor-align-left elementor-tablet-align-left elementor-mobile-align-left elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list">
                                            <div className="elementor-widget-container">
                                                <ul className="elementor-icon-list-items">
                                                    <li className="elementor-icon-list-item">
                                                        <span className="elementor-icon-list-icon">
                                                            <i aria-hidden="true" className="fas fa-phone-alt" />
                                                        </span>
                                                        <span className="elementor-icon-list-text">{phone}</span>
                                                    </li>
                                                    <li className="elementor-icon-list-item">
                                                        <span className="elementor-icon-list-icon">
                                                            <i aria-hidden="true" className="fas fa-envelope" />
                                                        </span>
                                                        <span className="elementor-icon-list-text">{email}</span>
                                                    </li>
                                                    <li className="elementor-icon-list-item">
                                                        <span className="elementor-icon-list-icon">
                                                            <i aria-hidden="true" className="fas fa-map-marker-alt" />
                                                        </span>
                                                        <span className="elementor-icon-list-text">{address}</span>
                                                    </li>
                                                </ul>
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

export default FooterLinks
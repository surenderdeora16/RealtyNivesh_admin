import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, NavDropdown } from 'react-bootstrap';

const active = "menu-item-home current-menu-item page_item page-item-6655 current_page_item menu-item-47";

export default () => {

    const [show, setShow] = useState(false);
    const [prevPosition, setPrevPosition] = useState(0)
    const [navClasses, setNavClasses] = useState('collapse');
    const [navClasses2, setNavClasses2] = useState('');

    const { logo, application_name } = useSelector(store => store.theme.settings);

    const handelToggle = () => {
        setShow(!show);
        if (show) {
            setNavClasses('collapsing');
            setTimeout(() => { setNavClasses('collapse') }, 200);
        } else {
            setNavClasses('collapsing');
            setTimeout(() => { setNavClasses('collapse show') }, 200);
        }
    }

    const closeMenu = () => {
        setShow(false);
        setNavClasses('collapse');
    }

    window.addEventListener("scroll", function (event) {
        closeMenu();
        var currentPosition = this.scrollY
        if (prevPosition < currentPosition) {
            setNavClasses2('scroll-down');
        } else if (currentPosition < 110) {
            setNavClasses2('');
        } else {
            setNavClasses2('scroll-up');
        }
        setPrevPosition(currentPosition);
    }, false);

    return (
        <div className="navbar-area navbar-area-2 style-2 extra-margin-top">
            <nav className={`navbar navbar-area navbar-expand-lg nav-transparent ${navClasses2} ${show ? 'expand_close' : ''}`}>
                <div className="container nav-container flex-nowrap nav-white border-2 border-danger">
                    <div  className="responsive-mobile-menu d-flex  align-items-center">
                        <div className="logo">
                            <Link className="standard-logo" to="/home"><img src={logo} alt={application_name} /></Link>
                            <Link className="retina-logo d-none" to="/home"><img src={logo} alt={application_name} /></Link>
                        </div>
                        <div className='d-table d-lg-none border-2 border-danger  userAvtar mx-5'>
                            <div style={{ width: '70px' }} className="nav-item dropdown  ">
                                <NavDropdown title={<AvatarBox />} id="navbarScrollingDropdown">
                                    <span className="dropdown-item fw-bold text-warning my-0">
                                        <span>{name}</span>
                                    </span>
                                    <NavDropdown.Divider className="my-1 " />
                                    <NavLink className="dropdown-item" to={`/user/profile`}>Profile &amp; Account </NavLink>
                                    <NavLink className="dropdown-item" to={`/user/booking-history`}>Booking History </NavLink>

                                    <NavLink className="dropdown-item" to={`/user/logout`}>Logout</NavLink>
                                </NavDropdown>
                            </div>
                        </div>
                        <button style={{marginTop: '40px'}} onClick={handelToggle} className={`s7t-header-menu toggle-btn d-block d-lg-none ${show ? 'open' : 'collapsed'}`} data-toggle="collapse" data-target="#yogastic_main_menu" aria-expanded={show} aria-label="Toggle navigation">
                            <span className="icon-left" />
                            <span className="icon-right" />
                        </button>
                    </div>
                    <div id="yogastic_main_menu" className={`navbar-collapse ${navClasses}`}>
                        <ul id="menu-menu" className="navbar-nav">
                            <Single onClick={closeMenu} label="Home" link="/home" />
                            <Multiple label="Offerings" links={[
                                { label: "Retreats", link: "/programs/wellness-retreats" },
                                { label: "Corporate Wellness", link: "/programs/corporate-wellness" },
                                { label: "Online Programs", link: "/programs/online-programs" }
                            ]} />
                            <Single onClick={closeMenu} label="Know yourself" link="/know-yourself" />
                            <Single onClick={closeMenu} label="About Us" link="/about" />
                            <Single onClick={closeMenu} label="Join Us" link="/join-us" />
                        </ul>
                    </div>
                    <div className='d-none d-lg-block border-2 border-danger  userAvtar mx-5'>
                        <div style={{ width: '70px' }} className="nav-item dropdown  ">
                            <NavDropdown title={<AvatarBox />} id="navbarScrollingDropdown">
                                <span className="dropdown-item fw-bold text-warning my-0">
                                    <span>{name}</span>
                                </span>
                                <NavDropdown.Divider className="my-1 " />
                                <NavLink className="dropdown-item" to={`/user/profile`}>Profile &amp; Account </NavLink>
                                <NavLink className="dropdown-item" to={`/user/booking-history`}>Booking History </NavLink>

                                <NavLink className="dropdown-item" to={`/user/logout`}>Logout</NavLink>
                            </NavDropdown>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

const AvatarBox = () => {
    const { image } = useSelector(store => store.user);
    return (
        <div className="avatar avatar-xl">
            <img className="rounded-circle border border-primary border-2 align-self-center " src={image ? image : Avatar} alt="" />
        </div>
    )
}

const Single = ({ label, link, onClick, className = () => null }) => {
    const { pathname } = useLocation();
    return <li onClick={onClick} className={`${className} menu-item menu-item-type-post_type menu-item-object-page ${pathname === link ? active : ''}`}>
        <NavLink to={link}>{label}</NavLink>
    </li>
}

const Multiple = ({ label, links }) => {
    const [show, setShow] = useState(false)
    return <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-50">
        <a href="" onClick={(e) => {
            e.preventDefault();
            setShow(!show)
        }}>{label}</a>
        <ul className={`sub-menu mt-lg-0 mt-2 ${show ? 'd-block' : ''}`}>
            {links.map(({ label, link }, i) => <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2566" key={i}><NavLink to={link}>{label}</NavLink></li>)}
        </ul>
    </li>
}


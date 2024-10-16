import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopOnRouteChange = () => {

    const { pathname } = useLocation();
    const [show, setShow] = useState(false);

    useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }, [pathname]);

    window.addEventListener("scroll", function (event) { setShow(this.scrollY > 200) }, false);

    return <div className={`position-fixed ${show ? 'd-block' : 'd-none'}`} style={{ bottom: 30, right: 30, zIndex: 9999 }}>
        <button className="btn rounded-2 border bg-theme text-brown h-auto px-3 py-2" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}>
            <i className="fa fa-arrow-up"></i>
        </button>
    </div>
};

export default ScrollToTopOnRouteChange;

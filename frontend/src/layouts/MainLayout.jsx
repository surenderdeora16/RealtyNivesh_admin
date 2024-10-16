import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Website/Navbar';
import Footer from '../components/Website/Footer';
import Loader from '../components/Website/Loader';
import ScrollToTopOnRouteChange from '../components/Website/ScrollToTopOnRouteChange';

// Style Sheets 
import '../assets/css/bootstrap.min.css';
import '../assets/css/theme.css';
import '../assets/css/fonts.css';
import '../assets/css/custom.css';

const MainLayout = () => {

    let navigation = useNavigation();
    return (
        <>
            <Navbar />
            <ScrollToTopOnRouteChange />
            {navigation.state !== "idle" && <Loader />}
            <div id="content" className="site-content">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default MainLayout
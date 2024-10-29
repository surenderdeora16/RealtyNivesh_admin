import { RouterProvider } from "react-router-dom";
import router from './router';
import { store } from './store'
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import CommonProvider from './layouts/CommonProvider';

import 'react-toastify/dist/ReactToastify.min.css';
import 'animate.css/animate.min.css'
import Loader from './components/Admin/Loader';

const App = () => {
    return (
        <Provider store={store}>
            <CommonProvider>
                <ToastContainer />
                <RouterProvider router={router} fallbackElement={<Loader />} />
            </CommonProvider>
        </Provider>
    )
}

export default App
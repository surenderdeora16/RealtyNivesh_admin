import React from 'react'
import { RouterProvider } from "react-router-dom";
import router from './router';
import Loader from './components/Website/Loader';
import { store } from './store'
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import CommonProvider from './layouts/CommonProvider';

import 'react-toastify/dist/ReactToastify.min.css';
import 'animate.css/animate.min.css'

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
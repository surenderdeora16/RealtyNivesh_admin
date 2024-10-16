import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AxiosHelper from '../../../helper/AxiosHelper';

const PaymentResponse = () => {
    const [response, setResponse] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchResponse = async () => {
            const query = new URLSearchParams(location.search);
            const encResp = query.get('encResp');

            try {
                const result = await AxiosHelper.postData('/user/payment-response', { encResp });
                setResponse(result.data.response);
            } catch (error) {
                console.error('Error fetching payment response:', error);
            }
        };

        fetchResponse();
    }, [location.search]);

    return (
        <div>
            <h1>Payment Response</h1>
            {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
        </div>
    );
};

export default PaymentResponse;

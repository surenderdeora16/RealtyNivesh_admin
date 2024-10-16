import React, { useState } from 'react';
import AxiosHelper from '../../../helper/AxiosHelper';
import { toast } from 'react-toastify';

const Payment = () => {
    const [orderId, setOrderId] = useState('xdfsdfsd');
    const [amount, setAmount] = useState(20);

    const handlePayment = async () => {
        // setLoading(true);
        try {
            const { data } = await AxiosHelper.postData('user/payment', { orderId, amount });
            if (data.status) {
                const { encRequest, accessCode } = data;
                if (encRequest && accessCode) {
                    setTimeout(() => {
                        const redirectUrl = `https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=${encRequest}&access_code=${accessCode}`;
                        window.location.href = redirectUrl;
                    }, [2000])
                } else {
                    throw new Error('Invalid response from payment gateway');
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Payment error:', error);
        }
    };

    return (
        <div className='p-5 border'>
            <h1>CCAvenue Payment Integration</h1>
            <input
                type="text"
                placeholder="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Payment;

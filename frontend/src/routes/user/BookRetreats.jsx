import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosHelper from '../../helper/AxiosHelper';
import { toast } from 'react-toastify';
import { CONFIG_GST } from '../../constant/fromConfig';

const BookRetreats = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(1);
    const [occupancyCount, setOccupancyCount] = useState({
        singleOccupancyCount: 0,
        doubleOccupancyCount: 0,
        tripleOccupancyCount: 0
    });
    const [discountCode, setDiscountCode] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discCode, setDiscCode] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = await AxiosHelper.getData(`/retreat-datatable/${slug}`);
                const responseData = response.data;
                if (responseData?.status === true) {
                    setData(responseData?.data);
                } else {
                    toast.error(responseData?.message);
                    navigate('/programs/wellness-retreats');
                }
            } catch (error) {
                console.error("Error fetching retreat data:", error);
            }
        })();
    }, [navigate]);

    const calculateTotal = useCallback(() => {
        if (!data) return;

        const currency = selectedCurrency === 1 ? 1 : 2;
        const singleOccupancyPrice = data?.prices?.find(p => p?.occupancy_type === 1 && p?.currency === currency)?.amount || 0;
        const doubleOccupancyPrice = data?.prices?.find(p => p?.occupancy_type === 2 && p?.currency === currency)?.amount || 0;
        const tripleOccupancyPrice = data?.prices?.find(p => p?.occupancy_type === 3 && p?.currency === currency)?.amount || 0;

        const total = (occupancyCount.singleOccupancyCount * singleOccupancyPrice) +
            (occupancyCount.doubleOccupancyCount * doubleOccupancyPrice) +
            (occupancyCount.tripleOccupancyCount * tripleOccupancyPrice);

        setTotalAmount(total);
    }, [data, selectedCurrency, occupancyCount]);

    useEffect(() => {
        if (discountCode) applyDiscount()
        if (totalAmount == 0 || totalAmount < discount) {
            setDiscountCode('')
            setDiscCode('')
            setDiscount(0)
        }
    }, [totalAmount])


    useEffect(() => {
        calculateTotal();
    }, [calculateTotal]);

    const gst = totalAmount * CONFIG_GST / 100;
    const netPayableAmount = totalAmount - discount + gst;
    const currencySymbol = selectedCurrency === 1 ? 'Rs.' : 'USD';

    const applyDiscount = async () => {
        try {
            const { data } = await AxiosHelper.postData('user/check-discount-code', {
                discount_code: discountCode,
                cart_amount: totalAmount,
                currency: selectedCurrency
            });

            if (data?.status) {
                toast.success(data?.message);
                setDiscount(data?.data?.discount_amount);
                setDiscCode(data?.data?.discount_code)
            } else {
                setDiscount(0);
                setDiscCode('')
                toast.error(data?.message || 'Something went wrong, Please try again later');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handelBooking = async () => {
        try {

            if (occupancyCount.singleOccupancyCount <= 0 && occupancyCount.doubleOccupancyCount <= 0 && occupancyCount.tripleOccupancyCount <= 0) {
                return toast.error('Please Select Occupancy.');
            }

            const { data: resData } = await AxiosHelper.postData('user/booking', {
                type: 1,
                retreat_id: data._id,
                single_occupancy: occupancyCount?.singleOccupancyCount,
                double_occupancy: occupancyCount?.doubleOccupancyCount,
                triple_occupancy: occupancyCount?.tripleOccupancyCount,
                currency: selectedCurrency,
                discount_code: discCode,
            });

            if (resData?.status) {
                const { encRequest, accessCode } = resData;
                if (encRequest && accessCode) {
                    setTimeout(() => {
                        const redirectUrl = `https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=${encRequest}&access_code=${accessCode}`;
                        window.location.href = redirectUrl;
                    }, [2000])
                } else {
                    throw new Error('Invalid response from payment gateway');
                }
            } else {
                toast.error(resData?.message || 'Something went wrong, Please try again later');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Container fluid="md" style={{ maxWidth: '1440px' }}>
            <Row className="justify-content-center">
                <Col md={6} className="bg-light p-5 rounded w-100 mx-auto">
                    <h3 className="text-center mb-4">Choose your Package</h3>
                    <Form>
                        <div className='d-table mx-auto mb-5'>
                            <div style={{ border: '1px solid gray' }} className="mb-3 d-flex justify-content-center">
                                <div>
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        className={`px-5 py-2 ${selectedCurrency === 1 ? 'bg-success text-light' : ''} h-100 d-flex justify-content-center align-items-center`}
                                        onClick={() => setSelectedCurrency(1)}
                                    >
                                        Indian
                                    </div>
                                </div>
                                <div>
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        className={`px-5 py-2 ${selectedCurrency === 2 ? 'bg-success text-light' : ''} h-100 d-flex justify-content-center align-items-center`}
                                        onClick={() => setSelectedCurrency(2)}
                                    >
                                        Foreign National
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-column justify-content-center'>
                            <Form.Group as={Row} className="mb-3 d-flex justify-content-center align-items-center">
                                <Form.Label column sm={4}>
                                    Single Occupancy
                                </Form.Label>
                                <Col sm={3}>
                                    <InputGroup>
                                        <Button variant="outline-secondary" onClick={() => setOccupancyCount(prevState => ({
                                            ...prevState,
                                            singleOccupancyCount: Math.max(0, prevState.singleOccupancyCount - 1)
                                        }))}>-</Button>
                                        <Form.Control type="text" className='text-center' readOnly value={occupancyCount.singleOccupancyCount} />
                                        <Button variant="outline-secondary" onClick={() => setOccupancyCount(prevState => ({
                                            ...prevState,
                                            singleOccupancyCount: prevState.singleOccupancyCount + 1
                                        }))}>+</Button>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3 d-flex justify-content-center align-items-center">
                                <Form.Label column sm={4}>
                                    Double Occupancy
                                </Form.Label>
                                <Col sm={3}>
                                    <InputGroup>
                                        <Button variant="outline-secondary" onClick={() => setOccupancyCount(prevState => ({
                                            ...prevState,
                                            doubleOccupancyCount: Math.max(0, prevState.doubleOccupancyCount - 1)
                                        }))}>-</Button>
                                        <Form.Control type="text" className='text-center' readOnly value={occupancyCount.doubleOccupancyCount} />
                                        <Button variant="outline-secondary" onClick={() => setOccupancyCount(prevState => ({
                                            ...prevState,
                                            doubleOccupancyCount: prevState.doubleOccupancyCount + 1
                                        }))}>+</Button>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3 d-flex justify-content-center align-items-center">
                                <Form.Label column sm={4}>
                                    Triple Occupancy
                                </Form.Label>
                                <Col sm={3}>
                                    <InputGroup>
                                        <Button variant="outline-secondary" onClick={() => setOccupancyCount(prevState => ({
                                            ...prevState,
                                            tripleOccupancyCount: Math.max(0, prevState.tripleOccupancyCount - 1)
                                        }))}>-</Button>
                                        <Form.Control type="text" className='text-center' readOnly value={occupancyCount.tripleOccupancyCount} />
                                        <Button variant="outline-secondary" onClick={() => setOccupancyCount(prevState => ({
                                            ...prevState,
                                            tripleOccupancyCount: prevState.tripleOccupancyCount + 1
                                        }))}>+</Button>
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3 mt-3 d-flex justify-content-center align-items-center">
                                <Form.Label column sm={4}>
                                    Discount Code
                                </Form.Label>
                                <Col sm={4}>
                                    <InputGroup>
                                        <Form.Control type="text" value={discountCode} className='fs-4 text-secondary' onChange={(e) => setDiscountCode(e.target.value)} />
                                        <Button className='bg-success text-light px-5' onClick={applyDiscount}>Apply</Button>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <div className="mt-2 d-flex flex-column align-items-center">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Total Amount:</td>
                                            <td>{currencySymbol} {totalAmount.toFixed(2)}</td>
                                        </tr>
                                        {discount > 0 ? <tr>
                                            <td>Discount:</td>
                                            <td>{currencySymbol} {discount.toFixed(2)}</td>
                                        </tr> : null}
                                        {discount > 0 ? <tr>
                                            <td>Discounted Amount:</td>
                                            <td>{currencySymbol} {(totalAmount - discount).toFixed(2)}</td>
                                        </tr> : null}
                                        <tr>
                                            <td>GST ({CONFIG_GST}%):</td>
                                            <td>{currencySymbol} {gst.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold">Net Payable Amount:</td>
                                            <td className="font-weight-bold">{currencySymbol} {netPayableAmount.toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button className="mt-3 bg-success text-white w-20" onClick={handelBooking}>Pay Now</Button>
                            </div>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default BookRetreats;

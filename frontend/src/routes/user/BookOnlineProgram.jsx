import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AxiosHelper from '../../helper/AxiosHelper';
import { toast } from 'react-toastify';
import { CONFIG_GST } from '../../constant/fromConfig';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackges } from '../../redux/online-program/onlineProgramSlice';

const validationSchema = Yup.object({
    slot: Yup.string().required('Please select a slot.'),
    package: Yup.string().required('Please select a package.')
});

const BookOnlineProgram = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { slots, packages } = useSelector(state => state.onlineProgram);
    const [selectedCurrency, setSelectedCurrency] = useState(1);
    const [planAmount, setPlanAmount] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discCode, setDiscCode] = useState('');

    useEffect(() => {
        if (packages.length === 0) {
            dispatch(fetchPackges());
        }
    }, [dispatch, packages.length]);

    const formik = useFormik({
        initialValues: {
            slot: '',
            package: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            const gst = totalAmount * CONFIG_GST / 100;
            const netPayableAmount = totalAmount - discount + gst;

            try {
                const response = await AxiosHelper.postData('user/booking', {
                    booking: 2,
                    slot_id: values.slot,
                    user_plan: 1,
                    package_id: values.package,
                    currency: selectedCurrency,
                    discount_code: discCode,
                    sub_total: totalAmount,
                    discount,
                    tax: gst,
                    total: netPayableAmount,
                });

                if (response?.status === 201) {
                    toast.success('Booking successful');
                    // navigate('/thank-you');
                } else {
                    toast.error(response?.data?.message || 'Something went wrong, Please try again later');
                }
            } catch (error) {
                toast.error('Error booking retreat');
            }
        }
    });

    const handleSlotChange = (slotId) => {
        formik.setFieldValue('slot', slotId);
    };

    const calculateTotal = useCallback(() => {
        setTotalAmount(planAmount);
    }, [planAmount]);

    useEffect(() => {
        calculateTotal();
    }, [calculateTotal]);

    const applyDiscount = async () => {
        try {
            const response = await AxiosHelper.postData('user/check-discount-code', {
                discount_code: discountCode,
                cart_amount: totalAmount,
                currency: selectedCurrency
            });

            if (response?.status === 200) {
                setDiscount(response?.data?.discount_amount);
                setDiscCode(response?.data?.discount_code);
                toast.success(response?.data?.message);
            } else {
                setDiscount(0);
                toast.error(response?.data?.message || 'Something went wrong, Please try again later');
            }
        } catch (error) {
            console.error("Error applying discount code:", error);
            toast.error('Error applying discount code');
        }
    };

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
        setPlanAmount(0);
        formik.setFieldValue('package', '');
    };

    const gst = totalAmount * CONFIG_GST / 100;
    const netPayableAmount = totalAmount - discount + gst;
    const currencySymbol = selectedCurrency === 1 ? 'Rs.' : 'USD';

    return (
        <Container fluid="md" style={{ maxWidth: '1440px' }}>
            <Row className="justify-content-center">
                <Col md={6} className="bg-light p-5 rounded w-100 mx-auto">
                    <h3 className="text-center mb-4">Choose your Package</h3>
                    <Form onSubmit={formik.handleSubmit}>
                        <div className='d-table mx-auto mb-5'>
                            <div style={{ border: '1px solid gray' }} className="mb-3 d-flex justify-content-center">
                                <div>
                                    <div
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: selectedCurrency === 1 ? '#994420' : '#E1CCAD',
                                            color: selectedCurrency === 1 ? '#e1ccad' : '#413625'
                                        }}
                                        className={`px-5 py-2`}
                                        onClick={() => handleCurrencyChange(1)}
                                    >
                                        Indian
                                    </div>
                                </div>
                                <div>
                                    <div
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: selectedCurrency === 2 ? '#994420' : '#E1CCAD',
                                            color: selectedCurrency === 2 ? '#e1ccad' : '#413625'
                                        }}
                                        className={`px-5 py-2 `}
                                        onClick={() => handleCurrencyChange(2)}
                                    >
                                        Foreign National
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mx-auto row col-8 flex-wrap gap-10'>
                            {formik.touched.slot && formik.errors.slot ? (
                                <div className="text-danger text-start">{formik.errors.slot}</div>
                            ) : null}
                            {slots.map((slot, index) => (
                                <Col  sm={12} md={6} lg={5} key={index} className="d-flex justify-content-center mx-auto mb-2">
                                    <Form.Check
                                        type="radio"
                                        name="slot"
                                        id={`slot-${slot.id}`}
                                        label={`${slot.days} ${slot.time}`}
                                        value={slot.id}
                                        checked={formik.values.slot === slot.id}
                                        onChange={() => handleSlotChange(slot.id)}
                                        className={formik.touched.slot && formik.errors.slot ? 'is-invalid' : ''}
                                    />
                                </Col>
                            ))}
                        </div>
                        <div className='row justify-content-center flex-wrap'>
                            <Form.Group as={Row} className="col-4 mt-2 d-flex justify-content-center align-items-center">
                                <Form.Label>Duration</Form.Label>
                                <Form.Select
                                    name="package"
                                    value={formik.values.package}
                                    onChange={(e) => {
                                        const selectedPackageId = e.target.value;
                                        const selectedPackage = packages.find(pkg => pkg?.id == selectedPackageId);
                                        formik.setFieldValue('package', selectedPackageId);
                                        setPlanAmount(selectedCurrency === 1 ? selectedPackage?.individual_inr : selectedPackage?.individual_usd);
                                    }}
                                    aria-label="Default select example"
                                    isInvalid={formik.touched.package && formik.errors.package}
                                >
                                    <option value={''}>Choose Package</option>
                                    {packages && Array.isArray(packages) ? (
                                        packages.map((pkg, i) => (
                                            <option key={i} value={pkg?.id}>{pkg?.duration}</option>
                                        ))
                                    ) : (
                                        <option disabled>No packages available</option>
                                    )}
                                </Form.Select>
                                {formik.touched.package && formik.errors.package ? (
                                    <div className="text-danger">{formik.errors.package}</div>
                                ) : null}
                            </Form.Group>
                            <Form.Group as={Row} className="col-4">
                                <div style={{lineHeight: '36px'}} className='mt-2 ms-2 position-relative'>Discount Code</div>
                                <Col>
                                    <InputGroup>
                                        <Form.Control type="text" className='text-secondary' onChange={(e) => setDiscountCode(e.target.value)} />
                                        <div
                                            style={{
                                                backgroundColor: '#E1CCAD',
                                                color: '#413625',
                                                cursor: 'pointer'
                                            }}
                                            className='py-2 px-5'
                                            onClick={applyDiscount}
                                        >
                                            Apply
                                        </div>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </div>
                        <div className='row justify-content-center'>
                            <div className="col-10 mt-2 d-flex flex-column align-items-center mt-4">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Total Amount:</td>
                                            <td>{currencySymbol} {totalAmount?.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Discount:</td>
                                            <td>{currencySymbol} {discount?.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Discounted Amount:</td>
                                            <td>{currencySymbol} {(totalAmount - discount)?.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>GST ({CONFIG_GST}%):</td>
                                            <td>{currencySymbol} {gst?.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold">Net Payable Amount:</td>
                                            <td className="font-weight-bold">{currencySymbol} {netPayableAmount.toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Button type="submit" className="mt-3 w-20">Pay Now</Button>
                            </div>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default BookOnlineProgram;

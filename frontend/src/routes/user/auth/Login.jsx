import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import OtpInput from '../../../components/OtpInput';
import AxiosHelper from '../../../helper/AxiosHelper';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logdedInUser } from "../../../redux/user/userSlice";
import { PHONE_REG_EXP } from '../../../constant/fromConfig';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const validationSchema = Yup.object({
        mobile: Yup.string().required().matches(PHONE_REG_EXP, "Phone number is not valid"),
        otp: Yup.number().typeError('invalid OTP code.').required('OTP is Required').integer(),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setLoading(true);
            const { data } = await AxiosHelper.postData('/user/login-otp', values);
            if (data?.status === true) {
                toast.success(data?.message);
                dispatch(logdedInUser(data?.data?.user))

                if (location.state == null || location?.state?.from == location.pathname) {
                    navigate('/user/dashboard')
                } else {
                    navigate(location?.state?.from)
                }
            } else {
                toast.error(data?.data?.mobile || data?.data?.otp || data?.message);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error?.message || 'Something went wrong');
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    const handleGetOtp = async (values) => {
        try {
            setLoading(true);
            const { data } = await AxiosHelper.postData('/user/send-otp', { mobile: values.mobile });
            if (data?.status === true) {
                setOtpSent(true);
                toast.success(data?.message);
            } else {
                toast.error(data?.data?.mobile)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };
    var { logo } = useSelector(store => store.theme.settings);

    return (
        <div style={{ background: '#f8f9fa', height: '100vh' }} className='container-fluid w-100 '>
            <div>
                <div style={{ height: '100vh' }} className="d-flex flex-column justify-content-center align-items-center py-5">
                    <Link className="d-flex flex-center mb-4" to='/dashboard'>
                        <img className="me-2" src={logo} alt="" width={150} />
                    </Link>
                    <div className="elementor-section w-100 elementor-inner-section elementor-element elementor-element-637ba93 form-outer elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                        <div className="elementor-container elementor-column-gap-no">
                            <div className="elementor-column  elementor-inner-column elementor-element elementor-element-596d84f elementor-hidden-tablet elementor-hidden-mobile elementor-hidden-laptop">
                                <div className="elementor-widget-wrap">
                                </div>
                            </div>
                            <div className="position-relative z-3 w-100   elementor-element elementor-element-82b2c9c form-inner elementor-widget elementor-widget-shortcode" data-id="82b2c9c" data-element_type="widget" data-settings="{&quot;navigation&quot;:&quot;both&quot;}" data-widget_type="shortcode.default">
                                <div className="elementor-widget-container">
                                    <div className="elementor-shortcode">
                                        <div className="wpcf7 no-js" lang="en-US" dir="ltr">
                                            <h2 style={{ color: '#333' }} className="text-center">Login</h2>
                                            <Formik
                                                initialValues={{ mobile: '', otp: '' }}
                                                validationSchema={validationSchema}
                                                onSubmit={handleSubmit}
                                            >
                                                {({ isSubmitting, values, setFieldValue }) => (
                                                    <Form className='d-flex flex-column justify-content-center align-items-center'>
                                                        <div className='main w-75 mt-4 d-flex flex-column justify-content-center align-items-center'>
                                                            <div className="main1 my-3">
                                                                <div>
                                                                    <span className="w-100 mb-1 mx-auto wpcf7-form-control-wrap d-flex position-relative" data-name="message">
                                                                        <Field type="text" id="mobile" name="mobile" className="wpcf7-form-control w-100" placeholder="Mobile no." />
                                                                        <div onClick={() => handleGetOtp(values)} type="button" style={{ background: '#f9a01b' }} className="position-absolute  text-light end-0 register-login-otpbtn btn d-flex justify-content-center align-items-center px-3">
                                                                            Get OTP
                                                                        </div>
                                                                    </span>
                                                                    <ErrorMessage name='mobile' component="div" className="small text-danger " />
                                                                </div>
                                                            </div>

                                                            {otpSent && (
                                                                <div className="mb-3">
                                                                    <label htmlFor="otp" className="form-label">Enter OTP</label>
                                                                    <div className='mb-3'>
                                                                        <OtpInput
                                                                            value={values.otp}
                                                                            onChange={value => setFieldValue('otp', value)}
                                                                            numInputs={6}
                                                                            shouldAutoFocus
                                                                            containerStyle="register-login-otp-container"
                                                                            inputStyle="register-login-otp-input"
                                                                            renderInput={(props, index) => <input key={index} {...props} />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting || loading}>
                                                                {loading ? `Loading...` : `Login`}
                                                            </button>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className='mt-4 text-center'>Not a member?  <Link to={'/register'} className='text-primary  text-decoration-underline'>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

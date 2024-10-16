import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import OtpInput from '../../../components/OtpInput';
import AxiosHelper from '../../../helper/AxiosHelper';
import { useDispatch } from 'react-redux';
import { logdedInUser } from '../../../redux/user/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PHONE_REG_EXP } from '../../../constant/fromConfig';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
        first_name: Yup.string().min(2).max(50).required('First Name is required'),
        last_name: Yup.string().min(2).max(50).required('Last Name is required'),
        email: Yup.string().min(5).max(100).email('Invalid email format').required('Email is required'),
        gender: Yup.string().required('Gender is Required'),
        otp: Yup.number().typeError('invalid OTP code.').required('OTP is Required').integer(),
        mobile: Yup.string().required().matches(PHONE_REG_EXP, "Phone number is not valid"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setLoading(true);
            const { data } = await AxiosHelper.postData('/user/register', values);
            if (data?.status === true) {
                dispatch(logdedInUser(values));
                toast.success(data?.message);
                navigate('/user/login')
                resetForm();
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            toast.error(data?.data?.message);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    const handleGetOtp = async (value) => {
        try {
            setLoading(true);
            const { data } = await AxiosHelper.postData('/user/send-otp', { mobile: value.mobile });
            if (data?.status === true) {
                toast.success(data?.message);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ background: '#f8f9fa' }} className='container-fluid'>
            <div className="register-container">
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
                                        <h2 style={{ color: '#333' }} className="text-center">Register</h2>
                                        <p className="text-center">Leave your application for the master class</p>
                                        <Formik
                                            initialValues={{
                                                first_name: '',
                                                last_name: '',
                                                email: '',
                                                gender: '',
                                                mobile: '',
                                                otp: '',
                                            }}
                                            validationSchema={validationSchema}
                                            onSubmit={handleSubmit}
                                        >
                                            {({ resetForm, setFieldValue, isSubmitting, values }) => (
                                                <Form className='d-flex flex-column justify-content-center align-items-center'>
                                                    <div className='main w-100 '>
                                                        <div className="row my-4">
                                                            <div className="main1 col-md-6">
                                                                <label htmlFor="first_name" className="form-label">First Name <span className='text-danger'>*</span></label>
                                                                <Field type="text" id="first_name" name="first_name" className="form-control register-login-input" />
                                                                <ErrorMessage name="first_name" component="div" className="text-danger" />
                                                            </div>
                                                            <div className="main2 col-md-6">
                                                                <label htmlFor="last_name" className="form-label">Last Name <span className='text-danger'>*</span></label>
                                                                <Field type="text" id="last_name" name="last_name" className="form-control register-login-input" />
                                                                <ErrorMessage name="last_name" component="div" className="text-danger" />
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <div className="main1 col-md-6">
                                                                <label htmlFor="email" className="form-label">Email <span className='text-danger'>*</span></label>
                                                                <Field type="email" id="email" name="email" className="form-control register-login-input py-2" />
                                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                                            </div>
                                                            <div className="main2 col-md-6">
                                                                <label htmlFor="gender" className="form-label">Gender <span className='text-danger'>*</span></label>
                                                                <Field as="select" id="gender" name="gender" className="form-select register-login-input mb-0">
                                                                    <option value="" label="Select gender" />
                                                                    <option value={1} label="Male" />
                                                                    <option value={2} label="Female" />
                                                                    <option value={3} label="Other" />
                                                                </Field>
                                                                <ErrorMessage name="gender" component="div" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="main1 col-md-6">
                                                                <label htmlFor="mobile" className="form-label">Mobile Number <span className='text-danger'>*</span></label>
                                                                <div className="input-group flex-nowrap">
                                                                    <Field type="text" id="mobile" name="mobile" className="form-control register-login-input fs-5 w-auto" />
                                                                    <button onClick={() => handleGetOtp(values)} type="button" className="btn btn-secondary py-0">
                                                                        Get OTP
                                                                    </button>
                                                                </div>
                                                                <ErrorMessage name="mobile" component="div" className="text-danger" />
                                                            </div>

                                                            <div className="main2 col-md-6">
                                                                <label htmlFor="otp" className="form-label">Enter OTP <span className='text-danger'>*</span></label>
                                                                <div className='mb-3'>
                                                                    <OtpInput
                                                                        value={values.otp}
                                                                        onChange={value => setFieldValue('otp', value)}
                                                                        numInputs={6}
                                                                        shouldAutoFocus
                                                                        skipDefaultStyles
                                                                        containerStyle="register-login-otp-container"
                                                                        inputStyle="register-login-otp-input"
                                                                        renderInput={(props, index) => <input key={index} {...props} className='form-control register-login-input' />}
                                                                    />
                                                                    <ErrorMessage name="otp" component="div" className="text-danger" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='d-flex justify-content-center align-items-center w-100'>
                                                            <button type="submit" className="mt-5 btn btn-primary w-25 " disabled={isSubmitting || loading}>
                                                                {loading ? `Loading...` : `Register`}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

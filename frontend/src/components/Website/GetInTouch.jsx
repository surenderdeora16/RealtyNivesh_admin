import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import AxiosHelper from '../../helper/AxiosHelper';
import { PHONE_REG_EXP } from '../../constant/fromConfig';

const GetInTouch = ({ heading = '', subheading = '', description = '', buttonText = '', buttonMain = '', submitWrapper = '', onSuccess = () => null, width, type }) => {

    const validationSchema = Yup.object({
        first_name: Yup.string().min(2).max(50).required('First Name is required'),
        last_name: Yup.string().min(2).max(50).required('Last Name is required'),
        email: Yup.string().min(5).max(100).email('Invalid email format').required('Email is required'),
        mobile: Yup.string().min(2).max(12).matches(PHONE_REG_EXP, "Phone number is not valid").required(),
        message: Yup.string().required('Message is required')
    });


    return (
        <div className={`elementor-column p-lg-3 p-0 ${width == "full" ? `elementor-col-100` : `elementor-col-100`}  elementor-inner-column elementor-element elementor-element-d988e77`} data-id="d988e77" data-element_type="column" data-settings="{&quot;navigation&quot;:&quot;both&quot;}">
            <div className="elementor-widget-wrap text-center text-md-start elementor-element-populated">
                {heading ? <div className="elementor-element elementor-element-5b76faf elementor-widget elementor-widget-heading" data-id="5b76faf" data-element_type="widget" data-settings="{&quot;navigation&quot;:&quot;both&quot;}" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                        <h4 className="elementor-heading-title elementor-size-default">
                            {heading}
                        </h4>
                    </div>
                </div> : null}
                {subheading ? <div className="elementor-element elementor-element-9d8bfcb elementor-widget elementor-widget-heading" data-id="9d8bfcb" data-element_type="widget" data-settings="{&quot;navigation&quot;:&quot;both&quot;}" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                        <h2 className={`elementor-heading-title elementor-size-default ${width == "full" ? `text-center` : ``}`}>
                            {subheading}
                        </h2>
                    </div>
                </div> : null}
                {description ? <div className="elementor-element elementor-element-a105fd8 elementor-widget elementor-widget-text-editor" data-id="a105fd8" data-element_type="widget" data-settings="{&quot;navigation&quot;:&quot;both&quot;}" data-widget_type="text-editor.default">
                    <div style={{ color: width === "full" ? '#994420' : '#6B6B6B', minHeight: 60 }} className={`elementor-widget-container ${width == "full" ? `text-center` : ``}`} >
                        {description}
                    </div>
                </div> : null}
                <div className="position-relative z-3 elementor-element elementor-element-82b2c9c form-inner elementor-widget elementor-widget-shortcode" data-id="82b2c9c" data-element_type="widget" data-settings="{&quot;navigation&quot;:&quot;both&quot;}" data-widget_type="shortcode.default">
                    <div className="elementor-widget-container">
                        <div className="elementor-shortcode">
                            <div className="wpcf7 no-js" lang="en-US" dir="ltr">
                                <Formik
                                    initialValues={{ type, first_name: '', last_name: '', mobile: '', email: '', message: '' }}
                                    validationSchema={validationSchema}
                                    onSubmit={async (values, { resetForm, setErrors }) => {
                                        try {
                                            const { data } = await AxiosHelper.postData("/contact-us", values);
                                            if (data?.status === true) {
                                                toast.success(data?.message);
                                                resetForm();
                                                onSuccess()
                                            } else {
                                                setErrors(data.data)
                                                toast.error(data?.message);
                                            }
                                        } catch (error) {
                                            toast.error(error?.message);
                                        }
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form method="post" className="wpcf7-form init">
                                            <div className="main">
                                                <div className="main1 mb-3">
                                                    <div>
                                                        <span className="wpcf7-form-control-wrap" data-name="first_name">
                                                            <Field size="40" className="wpcf7-form-control" placeholder="First Name" type="text" name="first_name" />
                                                        </span>
                                                    </div>
                                                    <ErrorMessage name='first_name' component="span" className="small text-danger" />
                                                </div>
                                                <div className="main2 mb-3">
                                                    <div>
                                                        <span className="wpcf7-form-control-wrap" data-name="last_name">
                                                            <Field size={40} className="wpcf7-form-control" placeholder="Last Name" type="text" name="last_name" />
                                                        </span>
                                                    </div>
                                                    <ErrorMessage name='last_name' component="span" className="small text-danger" />
                                                </div>
                                                <div className="main1 mb-3">
                                                    <div>
                                                        <span className="wpcf7-form-control-wrap" data-name="mobile">
                                                            <Field size={40} maxLength={10} className="wpcf7-form-control" placeholder="Phone" name="mobile" />
                                                        </span>
                                                    </div>
                                                    <ErrorMessage name='mobile' component="span" className="small text-danger" />
                                                </div>
                                                <div className="main2 mb-3">
                                                    <div>
                                                        <span className="wpcf7-form-control-wrap" data-name="email">
                                                            <Field size={40} className="wpcf7-form-control" placeholder="Email" name="email" />
                                                        </span>
                                                    </div>
                                                    <ErrorMessage name='email' component="span" className="small text-danger" />
                                                </div>
                                                <div className="main3 mb-3">
                                                    <div>
                                                        <span className="wpcf7-form-control-wrap" data-name="message">
                                                            <Field as="textarea" cols="40" rows="10" className="wpcf7-form-control" placeholder="Message" name="message" />
                                                        </span>
                                                    </div>
                                                    <ErrorMessage name='message' component="span" className="small text-danger" />
                                                </div>
                                                <div className="">
                                                    <div className={submitWrapper}>
                                                        <input className={`wpcf7-form-control wpcf7-submit`} type="submit" disabled={isSubmitting} value={buttonText} />
                                                        <span className="wpcf7-spinner"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="wpcf7-response-output" aria-hidden="true"></div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetInTouch

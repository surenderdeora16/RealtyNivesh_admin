import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify'
import AxiosHelper from '../../../helper/AxiosHelper';
import { FILE_SIZE, PHONE_REG_EXP, SUPPORTED_FORMATS_IMAGE } from '../../../constant/fromConfig';
import { updateUser } from '../../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {

    const dispatch = useDispatch();
    const profile = useSelector(store => store.user);
   
    const validSchema = Yup.object().shape({
        first_name: Yup.string().min(2).max(50).required('First Name is required'),
        last_name: Yup.string().min(2).max(50).required('Last Name is required'),
        mobile: Yup.string().required().matches(PHONE_REG_EXP, "Phone number is not valid"),
        email: Yup.string().min(2).max(50).email().required(),
        image: Yup.mixed()
            .test("fileSize", "File too large", (value) => {
                if (value && (typeof value) !== 'string') return value.size <= FILE_SIZE;
                return true;
            })
            .test("fileFormat", "Unsupported Format.", (value) => {
                if (value && (typeof value) !== 'string') return SUPPORTED_FORMATS_IMAGE.includes(value.type);
                return true;
            }),
    });


    return (
        <div className="send_us_msg">
            <h2 className='text-center'>Profile Settings</h2>
            <div className="d-flex justify-content-center py-5 ">
                <div className="elementor-section elementor-inner-section elementor-element elementor-element-637ba93 form-outer elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                    <div className="elementor-container elementor-column-gap-no">
                        <div className="elementor-column  elementor-inner-column elementor-element elementor-element-596d84f elementor-hidden-tablet elementor-hidden-mobile elementor-hidden-laptop">
                            <div className="elementor-widget-wrap">
                            </div>
                        </div>
                        <div className="position-relative z-3 w-100 elementor-element elementor-element-82b2c9c form-inner elementor-widget elementor-widget-shortcode" data-id="82b2c9c" data-element_type="widget" data-settings="{&quot;navigation&quot;:&quot;both&quot;}" data-widget_type="shortcode.default">
                            <div className="elementor-widget-container">
                                <div className="elementor-shortcode">
                                    <div className="wpcf7 no-js" lang="en-US" dir="ltr">
                                        <Formik
                                            initialValues={{ first_name: profile.first_name, last_name: profile.last_name, mobile: profile.mobile, email: profile.email, image: '' }}
                                            validationSchema={validSchema}
                                            onSubmit={async (values, { setSubmitting }) => {
                                                try {
                                                    var { data } = await AxiosHelper.postData("user/update-profile", values, true);
                                                    if (data?.status === true) {
                                                        dispatch(updateUser(data?.data))
                                                        toast.success(data?.message);
                                                    }
                                                } catch (error) {
                                                    toast.error(data?.message);
                                                }
                                                finally {
                                                    setSubmitting(false);
                                                }
                                            }}
                                        >
                                            {({ isSubmitting }) => (
                                                <Form method="post" className="wpcf7-form init ">
                                                    <div className="main">
                                                        <div className="main1 mb-4">
                                                            <div>
                                                                <span className="wpcf7-form-control-wrap" data-name="first_name">
                                                                    <Field size="40" className="wpcf7-form-control" placeholder="First Name" type="text" name="first_name" />
                                                                </span>
                                                            </div>
                                                            <ErrorMessage name='first_name' component="span" className="position-absolute small text-danger" />
                                                        </div>
                                                        <div className="main2 mb-4">
                                                            <div>
                                                                <span className="wpcf7-form-control-wrap" data-name="last_name">
                                                                    <Field size={40} className="wpcf7-form-control" placeholder="Last Name" type="text" name="last_name" />
                                                                </span>
                                                            </div>
                                                            <ErrorMessage name='last_name' component="span" className="position-absolute small text-danger" />
                                                        </div>
                                                        <div className="main1 mb-4">
                                                            <div>
                                                                <span className="wpcf7-form-control-wrap" data-name="mobile">
                                                                    <Field size={40} maxLength={10} className="wpcf7-form-control" placeholder="Phone" name="mobile" />
                                                                </span>
                                                            </div>
                                                            <ErrorMessage name='mobile' component="span" className="position-absolute small text-danger" />
                                                        </div>
                                                        <div className="main2 mb-4">
                                                            <div>
                                                                <span className="wpcf7-form-control-wrap" data-name="email">
                                                                    <Field size={40} className="wpcf7-form-control" placeholder="Email" name="email" />
                                                                </span>
                                                            </div>
                                                            <ErrorMessage name='email' component="span" className="position-absolute small text-danger" />
                                                        </div>
                                                        <div className="main3 mb-4">
                                                            <div>
                                                                <span className="wpcf7-form-control-wrap" data-name="image">
                                                                    <Field size={40} className="wpcf7-form-control" type="file" name="image" />
                                                                </span>
                                                            </div>
                                                            <ErrorMessage name='message' component="span" className="position-absolute small text-danger" />
                                                        </div>
                                                        <div className='d-flex justify-content-center'>
                                                            <div className='main4 d-flex justify-content-center'>
                                                                <input className={`wpcf7-form-control wpcf7-submit  py-3 px-4 fs-5 `} type="submit" disabled={isSubmitting} value="Update Profile" />
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
            </div>
        </div>

    )
}

export default Profile
import React, { useState } from 'react'
import MyForm from '../../../components/MyForm'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import AxiosHelper from '../../../helper/AxiosHelper';
import { FILE_SIZE, SUPPORTED_FORMATS_IMAGE } from '../../../constant/fromConfig';
import { useNavigate } from 'react-router-dom';


const AddRetreat = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({ name: '', status: '' })

    const initialValues = {
        name: "",
        short_description: "",
        location: "",
        access: "",
        check_in: "",
        check_out: "",
        maximum_bookings: "",
        image: "",
        status: "",

        prices: [
            {
                occupancy_type: 1,
                currency: 1,
                amount: "",
            },
            {
                occupancy_type: 2,
                currency: 1,
                amount: "",
            },
            {
                occupancy_type: 3,
                currency: 1,
                amount: "",
            },
            {
                occupancy_type: 1,
                currency: 2,
                amount: "",
            },
            {
                occupancy_type: 2,
                currency: 2,
                amount: "",
            },
            {
                occupancy_type: 3,
                currency: 2,
                amount: "",
            }
        ],

        details: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
        short_description: Yup.string().required('Short Description is required').min(10, 'Short Description must be at least 10 characters').max(200, 'Short Description must be less than 200 characters'),
        location: Yup.string().required('Location is required').min(2, 'Location must be at least 2 characters').max(200, 'Location must be less than 100 characters'),
        access: Yup.string().required('Access is required').min(2, 'Access must be at least 2 characters').max(200, 'Access must be less than 100 characters'),
        check_in: Yup.date().required('Check In is required'),
        check_out: Yup.date().required('Check Out is required'),
        maximum_bookings: Yup.number().positive().min(1).max(1000000).required('Maximum booking is required'),

        image: Yup.mixed()
            .test("fileSize", "File too large", (value) => {
                if (value && (typeof value) !== 'string') return value.size <= FILE_SIZE;
                return true;
            })
            .test("fileFormat", "Unsupported Format.", (value) => {
                if (value && (typeof value) !== 'string') return SUPPORTED_FORMATS_IMAGE.includes(value.type);
                return true;
            }),
        status: Yup.number().required('Status is required'),
        prices: Yup.array().of(
            Yup.object().shape({
                amount: Yup.number().required('Amount is required').min(0)
            })
        ),
        details: Yup.string().required('Details are required').min(10, 'Details must be at least 10 characters').max(5000, 'Details must be less than 1000 characters')
    });

    const fields = [
        {
            label: "Name",
            name: "name",
            type: "text",
            col: 6
        },
        {
            label: "Short Description",
            name: "short_description",
            type: "textarea",
            col: 6
        },
        {
            label: "Location",
            name: "location",
            type: "text",
            col: 6
        },
        {
            label: "Access",
            name: "access",
            type: "text ",
            col: 6
        },
        {
            label: "Check In",
            name: "check_in",
            type: "date",
            col: 6
        },
        {
            label: "Check Out",
            name: "check_out",
            type: "date",
            col: 6
        },
        {
            label: "Maximum Booking",
            name: "maximum_bookings",
            type: "number",
            col: 6
        },
        {
            label: "Status",
            name: "status",
            type: "select2",
            options: [
                {
                    id: 1, name: "Sold Out"
                },
                {
                    id: 2, name: "Past"
                },
                {
                    id: 3, name: "Upcoming"
                }
            ],
            col: 6
        },
        {
            label: "Image",
            name: "image",
            type: "file",
        },
        {
            label: "Pricing :",
            type: "line",
        },
        ...initialValues.prices.map((price, index) => ([
            {
                label: `Occupancy Type`,
                name: `prices[${index}].occupancy_type`,
                type: "readOnly",
                value: price.occupancy_type === 1 ? 'Single Occupancy' : price.occupancy_type === 2 ? 'Double Occupancy' : 'Triple Occupancy',
                hiddenValue: price.occupancy_type,
                col: 4
            },
            {
                label: `Currency`,
                name: `prices[${index}].currency`,
                type: "readOnly",
                value: price.currency === 1 ? 'INR' : 'USD',
                hiddenValue: price.currency,
                col: 4
            },
            {
                label: `Amount`,
                name: `prices[${index}].amount`,
                type: "text",
                col: 4
            }
        ])).flat(),
        {
            label: "Details :",
            type: "line",
        },

        {
            label: 'Details',
            name: 'details',
            type: 'text-editer',
            col: 12
        },
        {
            label: "Submit",
            name: "submit",
            type: "submit",
        }
    ];

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-3">
                        <div className="card-header">
                            <div className="row flex-between-end">
                                <div className="col-auto align-self-center">
                                    <h5 className="mb-0" data-anchor="data-anchor">Add Retreate</h5>
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <MyForm errors={errors} fields={fields} initialValues={initialValues} validSchema={validationSchema} onSubmit={async (values) => {
                                var data = "";
                                data = await AxiosHelper.postData("admin/retreat", values, true);
                                if (data?.data?.status === true) {
                                    toast.success(data?.data?.message);
                                    navigate('/retreat')
                                } else {
                                    setErrors(data?.data?.data)
                                    toast.error(data?.data?.message);
                                }
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRetreat

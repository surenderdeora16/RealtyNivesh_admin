import React, { useState, useEffect, useCallback } from 'react'
import * as Yup from "yup";
import { Modal, CloseButton } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Link } from 'react-router-dom';
import AxiosHelper from '../../helper/AxiosHelper';
import MyForm from '../../components/MyForm';
import Status from '../../components/Table/Status';
import Action from '../../components/Table/Action';
import { formatDateDDMMYYYY, getDeleteConfig, ucFirst } from '../../helper/StringHelper';

const MySwal = withReactContent(Swal)

const DiscountCoupon = () => {

    const [data, setData] = useState({ count: 0, record: [], totalPages: 0, pagination: [] });
    // *******************************************
    const [show, setShow] = useState(false);
    const [showView, setShowView] = useState(false)
    const [param, setParam] = useState({ limit: 10, pageNo: 1, query: "", orderBy: 'createdAt', orderDirection: -1 })
    const [initialValues, setInitialValues] = useState({
        name: '',
        code: '',
        discount_amount: '',
        min_cart_amount: '',
        discount_amount_usd: '',
        min_cart_amount_usd: '',
        expaire_date: '',
        max_uses: '',
        status: 1
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formType, setFormType] = useState('add')
    const [errors, setErrors] = useState({ name: '', status: '' })

    // ********************************* For Getting Data **************************************

    // get Table Data 
    const getDataForTable = useCallback(async () => {
        const { data } = await AxiosHelper.getData("admin/discount-coupons-datatable", param);
        if (data?.status === true) {
            let { count, totalPages, record, pagination } = data?.data
            setData({ count, totalPages, record, pagination })
        } else {
            toast.error(data?.message);
        }
    }, [param])

    const handelSort = (event) => {
        var orderBy = event.target.attributes.getNamedItem('data-sort').value;
        if (param?.orderBy !== orderBy) {
            setParam({ ...param, orderBy })
        } else {
            setParam({ ...param, orderDirection: param?.orderDirection * -1 })
        }
    }

    const handelPageChange = (pageNo) => { setParam({ ...param, pageNo }) }

    useEffect(() => { getDataForTable() }, [param])

    // ********************************* For Add Role **************************************

    const validSchema = Yup.object().shape({
        name: Yup.string().min(2).max(50).required(),
        code: Yup.string().min(5).max(20).required().matches(/^[a-zA-Z0-9]+$/, "Invalid format."),
        discount_amount: Yup.number('Please enter valid number.').typeError('Please enter valid number.').positive().min(1).max(1000000).required(),
        min_cart_amount: Yup.number('Please enter valid number.').typeError('Please enter valid number.').positive().min(1).max(1000000).required(),
        discount_amount_usd: Yup.number('Please enter valid number.').typeError('Please enter valid number.').positive().min(1).max(1000000).required(),
        min_cart_amount_usd: Yup.number('Please enter valid number.').typeError('Please enter valid number.').positive().min(1).max(1000000).required(),
        expaire_date: Yup.date().required(),
        max_uses: Yup.number('Please enter valid number.').typeError('Please enter valid number.').min(1).max(1000000).required(),
        status: Yup.bool().required(),
    });

    const fields = [
        {
            label: "Coupon Code Name",
            name: "name",
            type: "text",
            col: 6
        },
        {
            label: "Coupon Code",
            name: "code",
            type: "text",
            col: 6
        },
        {
            label: "Discount Amount",
            name: "discount_amount",
            type: "number",
            col: 6
        },
        {
            label: "Min Cart Amount",
            name: "min_cart_amount",
            type: "number",
            col: 6
        },
        {
            label: "Discount Amount USD",
            name: "discount_amount_usd",
            type: "number",
            col: 6
        },
        {
            label: "Min Cart Amount USD",
            name: "min_cart_amount_usd",
            type: "number",
            col: 6
        },
        {
            label: "Expaire Date",
            name: "expaire_date",
            type: "date",
            col: 6
        },
        {
            label: "Max Uses",
            name: "max_uses",
            type: "text",
            col: 6
        },
        {
            label: "Status",
            name: "status",
            type: "select2",
            options: [
                { id: 1, name: "Active" },
                { id: 0, name: "InActive" },
            ],
            col: 6
        },
        {
            label: "Submit",
            name: "submit",
            type: "submit",
        }
    ];

    // ********************************* For Edit Role **************************************

    const editData = async (event) => {
        var { id, name, code, discount_amount, min_cart_amount, discount_amount_usd, min_cart_amount_usd, expaire_date, max_uses, status } = JSON.parse(event.target.attributes.getNamedItem('main-data').value);
        setInitialValues({ id, name, code, discount_amount, min_cart_amount, discount_amount_usd, min_cart_amount_usd, expaire_date, max_uses, status: status ? 1 : 0 });
        setErrors({})
        setFormType('edit')
        setShow(true);
    }

    // ********************************* For Delete Role **************************************

    const deleteData = async (event) => {
        var { isConfirmed } = await MySwal.fire(getDeleteConfig({}))
        if (isConfirmed) {
            var { id } = JSON.parse(event.target.attributes.getNamedItem('main-data').value);
            var { data } = await AxiosHelper.deleteData(`admin/delete-record/discountcoupons/${id}`);
            if (data?.status === true) {
                getDataForTable()
                toast.success(data?.message);
            } else {
                toast.error(data?.message);
            }
        }
    }

    const viewData = async (event) => {
        var data = JSON.parse(event.target.attributes.getNamedItem('main-data').value);
        setFormType('view')
        setInitialValues(data)
        setShowView(true)
    }

    const dropList = [
        {
            name: "View",
            onClick: viewData
        },
        {
            name: "Edit",
            onClick: editData
        },
        {
            name: "Delete",
            onClick: deleteData,
            className: "text-danger"
        },
    ]

    return (
        <>
            <div className="row" >
                <div className="col-md-12" >
                    <div className="card mb-3">
                        <div className="card-header">
                            <div className="row flex-between-end">
                                <div className="col-auto align-self-center">
                                    <h5 className="mb-0" data-anchor="data-anchor">
                                        Manage Discount Coupons :: Discount Coupons List
                                    </h5>
                                </div>
                                <div className="col-auto ms-auto">
                                    <div className="mt-2" role="tablist">
                                        <Link to={`/admin/dashboard`} className="me-2 btn btn-sm btn-falcon-default">
                                            <i className="fa fa-home me-1"></i>
                                            <span className="d-none d-sm-inline-block ms-1">Dashboard</span>
                                        </Link>
                                        <button onClick={() => {
                                            setInitialValues({
                                                name: '',
                                                code: '',
                                                discount_amount: '',
                                                min_cart_amount: '',
                                                expaire_date: '',
                                                max_uses: '',
                                                status: 1
                                            })
                                            setErrors({
                                                name: '',
                                                code: '',
                                                discount_amount: '',
                                                min_cart_amount: '',
                                                expaire_date: '',
                                                max_uses: '',
                                                status: ''
                                            })
                                            setFormType('add')
                                            setShow(true)
                                        }} className="btn btn-sm btn-falcon-default">
                                            <i className="fa fa-plus me-1"></i>
                                            Add Coupon
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body pt-0">
                            <div className="row  justify-content-between mb-3">
                                <div className="col-md-6 d-flex">
                                    <span className='pe-2'>Show</span>
                                    <select className="w-auto form-select form-select-sm" onChange={(e) => setParam({ ...param, limit: e.target.value })} >
                                        {[10, 20, 50].map((row) => <option key={row} value={row}>{row}</option>)}
                                    </select>
                                    <span className='ps-1'>entries</span>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="position-relative input-group">
                                        <input placeholder="Search..." onChange={(e) => setParam({ ...param, query: e.target.value, pageNo: 1 })} type="search" id="search" className="shadow-none form-control form-control-sm" />
                                        <span className="bg-transparent input-group-text">
                                            <div className="fa fa-search text-primary"></div>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-content">
                                <div id="tableExample2" data-list="">
                                    <div className="table-responsive1 ">
                                        <table className="table table-bordered table-striped fs--1 mb-0">
                                            <thead className="bg-200 text-900">
                                                <tr>
                                                    <th onClick={(event) => handelSort(event)} className={`sort ${param?.orderBy === "name" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="name">Name</th>
                                                    <th onClick={(event) => handelSort(event)} className={`sort ${param?.orderBy === "code" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="code">Code</th>
                                                    <th onClick={(event) => handelSort(event)} className={`sort ${param?.orderBy === "discount_amount" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="discount_amount">Discount Amount</th>
                                                    <th onClick={(event) => handelSort(event)} className={`sort ${param?.orderBy === "expaire_date" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="expaire_date">Expaire Date</th>
                                                    <th onClick={(event) => handelSort(event)} className={`sort ${param?.orderBy === "createdAt" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="createdAt">Created Date</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">
                                                {data?.record && data?.record.map((row, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td className="fw-bold text-primary cursor-pointer" main-data={JSON.stringify(row)} onClick={viewData}>{row.name}</td>
                                                            <td>{row.code}</td>
                                                            <td><i className="fa fa-inr"></i> {row.discount_amount}</td>
                                                            <td>{formatDateDDMMYYYY(row.expaire_date)}</td>
                                                            <td>{formatDateDDMMYYYY(row.createdAt)}</td>
                                                            <td><Status table='discountcoupons' status={row.status} data_id={row._id} /></td>
                                                            <td><Action dropList={dropList} data={row} /></td>
                                                        </tr>
                                                    )
                                                })}
                                                {data?.record.length === 0 && <tr><td colSpan="100" className='text-danger text-center'>No data available..</td></tr>}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="row align-items-center mt-3">
                                    <div className="col">
                                        <p className="mb-0 fs--1">
                                            <span className="d-none d-sm-inline-block" data-list-info="data-list-info">{(param.pageNo - 1) * param.limit + 1} to {param.pageNo * param.limit > data?.count ? data?.count : param.pageNo * param.limit} of {data?.count}</span>
                                            <span className="d-none d-sm-inline-block"> </span>
                                        </p>
                                    </div>
                                    <div className="col-auto">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button type="button" dd="disabled" className=" btn btn-falcon-default btn-sm" onClick={() => handelPageChange(1)}>
                                                <span className="fas fa-chevron-left" />
                                            </button>
                                            <ul className="pagination mb-0 mx-1">
                                                {data?.pagination.map((row, i) => {
                                                    return (
                                                        <li key={row}>
                                                            <button onClick={() => handelPageChange(row)} type="button" className={`page me-1 btn btn-sm ${row === data?.pageNo ? "btn-primary" : "btn-falcon-default"}`}>
                                                                {row}
                                                            </button>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            <button type="button" className="btn btn-falcon-default btn-sm" onClick={() => handelPageChange(data?.totalPages)}>
                                                <span className="fas fa-chevron-right"> </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Modal size="lg" show={show} fullscreen={false} onHide={() => setShow(false)} centered>
                <Modal.Header>
                    <Modal.Title>{ucFirst(formType)} Coupon</Modal.Title>
                    <CloseButton
                        className="btn btn-circle btn-sm transition-base p-0"
                        onClick={() => setShow(false)}
                    />
                </Modal.Header>
                <Modal.Body>
                    <MyForm errors={errors} fields={fields} initialValues={initialValues} validSchema={validSchema} onSubmit={async (values) => {
                        initialValues.status = Number(initialValues.status)
                        var data = "";
                        if (formType === 'add') {
                            data = await AxiosHelper.postData("admin/discount-coupon", values);
                        } else {
                            data = await AxiosHelper.putData(`admin/discount-coupon?id=${values.id}`, values);
                        }

                        if (data?.data?.status === true) {
                            getDataForTable()
                            setShow(false)
                            toast.success(data?.data?.message);
                        } else {
                            setErrors(data?.data?.data)
                            toast.error(data?.data?.message);
                        }
                        setIsSubmitted(false)
                    }} />
                </Modal.Body>
            </Modal>

            <Modal
                size="lg"
                show={showView}
                centered={true}
                onHide={() => setShowView(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        View Coupon
                    </Modal.Title>
                    <CloseButton onClick={() => setShowView(false)} />
                </Modal.Header>
                <Modal.Body>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <label className='fs--1 m-0'>Name</label>
                            <span className="fs--1">{initialValues?.name}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <label className='fs--1 m-0'>Code</label>
                            <span className="fs--1">{initialValues?.code}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <label className='fs--1 m-0'>Discount Amount</label>
                            <span className="fs--1"><i className="fa fa-inr me-1"></i>{initialValues?.discount_amount}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <label className='fs--1 m-0'>Min Cart Amount</label>
                            <span className="fs--1"><i className="fa fa-inr me-1"></i>{initialValues?.min_cart_amount}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <label className='fs--1 m-0'>Expaire Date</label>
                            <span className="fs--1">{formatDateDDMMYYYY(initialValues?.expaire_date)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <label className='fs--1 m-0'>Max Uses</label>
                            <span className="fs--1">{initialValues?.max_uses}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <label className='fs--1 m-0'>Used Count</label>
                            <span className="fs--1">{initialValues?.used_count}</span>
                        </li>
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DiscountCoupon
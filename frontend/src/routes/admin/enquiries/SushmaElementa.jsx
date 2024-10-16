import React, { useState, useEffect, useCallback } from 'react';
import { Modal, CloseButton, Tabs, Tab } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import AxiosHelper from '../../../helper/AxiosHelper';
import Action from '../../../components/Table/Action';
import { formatDateDDMMYYYY } from '../../../helper/StringHelper';
import { ENQUERY_FORM_TYPES } from '../../../constant/fromConfig';

const Enquiry = () => {
    const [data, setData] = useState({ count: 0, record: [], totalPages: 0, pagination: [] });
    const [showView, setShowView] = useState(false);
    const [param, setParam] = useState({ limit: 10, pageNo: 1, query: "", orderBy: 'createdAt', orderDirection: -1 });
    const [initialValues, setInitialValues] = useState({
        name: '',
        mobile: '',
        email: '',
        siteVisitDate: '',
        event: '',
        otpStatus: '',
        createdAt: '',
    });
    const [activeTab, setActiveTab] = useState('1'); // Default active tab

    const getDataForTable = useCallback(async () => {
        const { data } = await AxiosHelper.getData("/admin/sushmaelementa-enquiry-datatable", param);
        if (data?.status === true) {
            let { count, totalPages, record, pagination } = data?.data;
            setData({ count, totalPages, record, pagination });
            console.log('data', data)
        } else {
            toast.error(data?.message);
        }
    }, [param]);

    const handelSort = (event) => {
        var orderBy = event.target.attributes.getNamedItem('data-sort').value;
        if (param?.orderBy !== orderBy) {
            setParam({ ...param, orderBy });
        } else {
            setParam({ ...param, orderDirection: param?.orderDirection * -1 });
        }
    };

    const handelPageChange = (pageNo) => { setParam({ ...param, pageNo }); };

    useEffect(() => { getDataForTable(); }, [param, getDataForTable]);

    const viewData = async (event) => {
        var data = JSON.parse(event.target.attributes.getNamedItem('main-data').value);
        setInitialValues(data);
        setShowView(true);
    };

    const dropList = [
        {
            name: "View",
            onClick: viewData
        },
    ];

    const filteredRecords = data.record.filter(record => record.type === parseInt(activeTab));

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-3">
                        <div className="card-header">
                            <div className="row flex-between-end">
                                <div className="col-auto align-self-center">
                                    <h5 className="mb-0" data-anchor="data-anchor">Sushma Elementa Enquiries</h5>
                                </div>
                                <div className="col-auto ms-auto">
                                    <div className="mt-2" role="tablist">
                                        <Link to={`/dashboard`} className="me-2 btn btn-sm btn-falcon-default">
                                            <i className="fa fa-home me-1"></i>
                                            <span className="d-none d-sm-inline-block ms-1">Dashboard</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body pt-0">
                            <div className="row justify-content-between mb-4">
                                <div className="col-md-6 d-flex">
                                    <span className='pe-2'>Show</span>
                                    <select className="w-auto form-select form-select-sm" onChange={(e) => setParam({ ...param, limit: e.target.value })}>
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

                            <Tabs activeKey={activeTab} fill onSelect={(k) => setActiveTab(k)} className="mb-3">
                                {ENQUERY_FORM_TYPES.map((row, i) => (
                                    <Tab eventKey={row.value} title={row.label} key={i}>
                                        <TableContent records={filteredRecords} handelSort={handelSort} dropList={dropList} viewData={viewData} param={param} />
                                    </Tab>
                                ))}
                            </Tabs>

                            <div className="row align-items-center mt-3">
                                <div className="col">
                                    <p className="mb-0 fs--1">
                                        <span className="d-none d-sm-inline-block" data-list-info="data-list-info">{(param.pageNo - 1) * param.limit + 1} to {param.pageNo * param.limit > data?.count ? data?.count : param.pageNo * param.limit} of {data?.count}</span>
                                        <span className="d-none d-sm-inline-block"> </span>
                                    </p>
                                </div>
                                <div className="col-auto">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button type="button" dd="disabled" className="btn btn-falcon-default btn-sm" onClick={() => handelPageChange(1)}>
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
                                                );
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

            <Modal
                size="lg"
                show={showView}
                centered={true}
                onHide={() => setShowView(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        View Users
                    </Modal.Title>
                    <CloseButton onClick={() => setShowView(false)} />
                </Modal.Header>
                <Modal.Body>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <label className='fs--1 m-0'>Type</label>
                            <span className="fs--1">
                                {ENQUERY_FORM_TYPES.find(row => row.value == initialValues?.type)?.label}
                            </span>
                        </li>
                        {initialValues.name && (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <label className='fs--1 m-0'>name</label>
                                <span className="fs--1">{initialValues?.name}</span>
                            </li>
                        )}
                        {initialValues.mobile && (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <label className='fs--1 m-0'>mobile</label>
                                <span className="fs--1">{initialValues?.mobile}</span>
                            </li>
                        )}
                        {initialValues.email && (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <label className='fs--1 m-0'>Email</label>
                                <span className="fs--1">{initialValues?.email}</span>
                            </li>
                        )}
                        {initialValues.siteVisitDate && (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <label className='fs--1 m-0'>Site Visit Date</label>
                                <span className="fs--1">{initialValues?.siteVisitDate}</span>
                            </li>
                        )}
                        {initialValues.preferredHomeSize && (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <label className='fs--1 m-0'>Preferred Home Size</label>
                                <span className="fs--1">{initialValues?.preferredHomeSize}</span>
                            </li>
                        )}
                        {initialValues.broker && (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <label className='fs--1 m-0'>Broker</label>
                                <span className="fs--1">{initialValues?.broker}</span>
                            </li>
                        )}
                        {initialValues.howHeardAboutUs && (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <label className='fs--1 m-0'>How Heard About Us</label>
                                <span className="fs--1">{initialValues?.howHeardAboutUs}</span>
                            </li>
                        )}
                        {initialValues.createdAt && (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <label className='fs--1 m-0'>Date</label>
                                <span className="fs--1">{formatDateDDMMYYYY(initialValues?.createdAt)}</span>
                            </li>
                        )}
                        {initialValues.message && (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <label className='fs--1 m-0'>Message</label>
                                <span className="fs--1 ps-5 text-center">{initialValues?.message}</span>
                            </li>
                        )}
                    </ul>
                </Modal.Body>
            </Modal>
        </div>
    );
}

const TableContent = ({ records, handelSort, dropList, viewData, param }) => (
    <div className="tab-content">
        <div id="tableExample2" data-list="">
            <div className="table-responsive1">
                <table className="table table-bordered table-striped fs--1 mb-0">
                    <thead className="bg-200 text-900">
                        <tr>
                            {records.some(row => row.name) && (
                                <th onClick={handelSort} className={`sort ${param?.orderBy === "name" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="name">Name</th>
                            )}
                            {records.some(row => row.mobile) && (
                                <th onClick={handelSort} className={`sort ${param?.orderBy === "mobile" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="mobile">Mobile</th>
                            )}
                            {records.some(row => row.email) && (
                                <th onClick={handelSort} className={`sort ${param?.orderBy === "email" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="email">Email</th>
                            )}
                            {records.some(row => row.siteVisitDate) && (
                                <th onClick={handelSort} className={`sort ${param?.orderBy === "siteVisitDate" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="siteVisitDate">Site Visit Date</th>
                            )}
                            {records.some(row => row.message) && (
                                <th onClick={handelSort} className={`sort ${param?.orderBy === "message" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="message">Message</th>
                            )}
                            {records.some(row => row.event) && (
                                <th onClick={handelSort} className={`sort ${param?.orderBy === "event" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="event">Event</th>
                            )}
                            {records.some(row => row.otpStatus) && (
                                <th onClick={handelSort} className={`sort ${param?.orderBy === "otpStatus" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="otpStatus">OTP Status</th>
                            )}
                            {records.some(row => row.createdAt) && (
                                <th onClick={handelSort} className={`sort ${param?.orderBy === "createdAt" && (param?.orderDirection === 1 ? 'asc' : 'desc')}`} data-sort="createdAt">Date</th>
                            )}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="list">
                        {records.map((row, i) => (
                            <tr key={i}>
                                {row.name && (
                                    <td className="fw-bold text-primary cursor-pointer" main-data={JSON.stringify(row)} onClick={viewData}>{row.name}</td>
                                )}
                                {row.mobile && (
                                    <td>{row.mobile}</td>
                                )}
                                {row.email && (
                                    <td>{row.email}</td>
                                )}
                                {row.siteVisitDate && (
                                    <td>{row.siteVisitDate}</td>
                                )}
                                {row.message && (
                                    <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{row.message}</td>
                                )}
                                {row.event && (
                                    <td>{row.event}</td>
                                )}
                                {row.otpStatus && (
                                    <td className={`${row.otpStatus == 'otp verified' ? 'text-success' : row.otpStatus == 'otp not verified' ? 'text-danger' : ''} text-uppercase`}>{row.otpStatus}</td>
                                )}
                                <td>{formatDateDDMMYYYY(row.createdAt)}</td>
                                <td><Action dropList={dropList} data={row} /></td>
                            </tr>
                        ))}
                        {records.length === 0 && <tr><td colSpan="100" className='text-danger text-center'>No data available..</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

export default Enquiry;

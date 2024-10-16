import React, { useCallback, useEffect, useState } from 'react';
import { Table, Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AxiosHelper from '../../helper/AxiosHelper';
import { formatDateDDMMYYYY } from '../../helper/StringHelper';

const BookingHistory = () => {
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState(1);
    const [loading, setLoading] = useState(true);
    const [param, setParam] = useState({ limit: 10, pageNo: 1, query: "", orderBy: 'createdAt', orderDirection: -1, type: activeTab });

    const fetchBookingData = useCallback(async () => {
        try {
            const response = await AxiosHelper.getData(`user/booking-history`, param);
            const responseData = response.data;
            if (responseData?.status === true) {
                setData(responseData?.data);
            } else {
                toast.error(responseData?.message);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching booking history data:", error);
            toast.error("Failed to load booking history.");
            setLoading(false);
        }
    }, [param]);

    useEffect(() => {
        fetchBookingData();
    }, [fetchBookingData, param]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setParam({ ...param, type: tab, pageNo: 1 });
    };

    const handlePageChange = (pageNo) => {
        setParam({ ...param, pageNo });
    };

    const renderRetreatBookingRows = () => (
        data?.record?.map((booking, index) => (
            <tr key={index}>
                <td>{formatDateDDMMYYYY(booking?.createdAt)}</td>
                <td>{booking?.single_occupancy <= 0 ? '-' : `${booking?.single_occupancy} Person`}</td>
                <td>{booking?.double_occupancy <= 0 ? '-' : `${booking?.double_occupancy} Person`}</td>
                <td>{booking?.triple_occupancy <= 0 ? '-' : `${booking?.triple_occupancy} Person`}</td>
                <td>{booking?.currency === 1 ? '₹' : '$'} {booking?.total?.toFixed(2)}</td>
            </tr>
        ))
    );

    const renderOnlineBookingRows = () => (
        data?.record?.map((booking, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{booking?.user_plan === 1 ? 'Individual Plan' : 'Group Plan'}</td>
                <td>{booking?.currency === 1 ? '₹' : '$'} {booking?.sub_total}</td>
                <td>{booking?.discount ? `${booking.currency === 1 ? '₹' : '$'} ${booking.discount}` : '-'}</td>
                <td>{booking?.currency === 1 ? '₹' : '$'} {booking?.tax}</td>
                <td>{booking?.currency === 1 ? '₹' : '$'} {booking?.total?.toFixed(2)}</td>
                <td>{formatDateDDMMYYYY(booking?.createdAt)}</td>
            </tr>
        ))
    );

    return (
        <Container fluid="md" style={{ maxWidth: '1440px' }}>
            <Row className="justify-content-center">
                <Col md={10} className="p-5 rounded w-100 mx-auto">
                    <h3 className="text-center mb-4">Booking History</h3>
                    <Tabs activeKey={activeTab} onSelect={handleTabChange} fill id="booking-tabs">
                        <Tab eventKey={1} title="Retreat Booking">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <Table striped bordered hover>
                                    <thead className='fs-6'>
                                        <tr>
                                            <th>Booking Date</th>
                                            <th>Single Occupancy</th>
                                            <th>Double Occupancy</th>
                                            <th>Triple Occupancy</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className='fs-6'>
                                        {renderRetreatBookingRows()}
                                        {data?.record?.length === 0 && <tr><td colSpan="9" className='text-danger text-center'>No data available.</td></tr>}
                                    </tbody>
                                </Table>
                            )}
                        </Tab>
                        <Tab eventKey={2} title="Online Booking">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <Table striped bordered hover>
                                    <thead className='fs-6'>
                                        <tr>
                                            <th>S No.</th>
                                            <th>User Plan </th>
                                            <th>Subtotal </th>
                                            <th>Discount </th>
                                            <th>Tax </th>
                                            <th>Total </th>
                                            <th>Booking Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className='fs-6'>
                                        {renderOnlineBookingRows()}
                                        {data?.record?.length === 0 && <tr><td colSpan="9" className='text-danger text-center'>No data available.</td></tr>}
                                    </tbody>
                                </Table>
                            )}
                        </Tab>
                    </Tabs>

                    <div className="row justify-content-center align-items-center mt-5">
                        <div className="col-auto mt-4">
                            <div className="d-flex justify-content-center align-items-center">
                                <button type="button" className="btn btn-falcon-default btn-sm" onClick={() => handlePageChange(param.pageNo - 1)} disabled={param.pageNo === 1}>
                                    <span className="fas fa-chevron-left" />
                                </button>
                                <div className="col px-5">
                                    <p className="mb-0 fs--1">
                                        <span>{(param.pageNo - 1) * param.limit + 1} to {param.pageNo * param.limit > data?.count ? data?.count : param.pageNo * param.limit} of {data?.count}</span>
                                    </p>
                                </div>
                                <button type="button" className="btn btn-falcon-default btn-sm" onClick={() => handlePageChange(param.pageNo + 1)} disabled={param.pageNo * param.limit >= data?.count}>
                                    <span className="fas fa-chevron-right" />
                                </button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default BookingHistory;

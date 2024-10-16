import React, { useCallback, useEffect, useState } from 'react'
import PageHeader from '../../../components/Website/PageHeader'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AxiosHelper from '../../../helper/AxiosHelper';
import { formatDateDDMMYYYY } from '../../../helper/StringHelper';
import { CONFIG_GST } from '../../../constant/fromConfig';

const ProgramDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState()

    const fetchRetreatData = useCallback(async () => {
        try {
            const { data } = await AxiosHelper.getData(`/retreat-datatable/${slug}`);
            if (data?.status === true) {
                setData(data?.data);
            } else {
                toast.error(data?.message);
                navigate('/programs/wellness-retreats');
            }
        } catch (error) {
            console.error("Error fetching retreat data:", error);
        }
    }, [slug, navigate]);

    useEffect(() => {
        fetchRetreatData();
    }, [fetchRetreatData]);




    return (
        <>
            <PageHeader title={data?.name} subTitle={data?.short_description} />
            <div className="blog-details-area program-details">
                <div className="container yogastic-page-container">
                    <div className="row ">
                        <div className="col-lg-12">
                            <article id="post-6697" className="standard-postbox-details post-6697 post type-post status-publish format-standard has-post-thumbnail hentry category-yogastiic">
                                <div className="blog-details-inner">
                                    <div className="blog-details-content">
                                        <div className="py-4">
                                            <div dangerouslySetInnerHTML={{ __html: data?.details }} />

                                            <div className="mb-3">
                                                <a className='text-decoration-underline mb-2 text-theme d-block' href="" target="_blank" rel="noopener noreferrer">Request sample Itinerary</a>
                                                <p className='mb-2'><span className='me-2 d-inline-block' style={{ width: 20 }}><i className="text-gray fa-regular fa-calendar"></i></span>  Check-in: {formatDateDDMMYYYY(data?.check_in)}; Check-out: {formatDateDDMMYYYY(data?.check_out)}</p>
                                                <p className='mb-2'><span className='me-2 d-inline-block' style={{ width: 20 }}><i className="text-gray fa-regular fa-location-dot"></i></span> {data?.location}</p>
                                                <p className='mb-2'><span className='me-2 d-inline-block' style={{ width: 20 }}><i className="text-gray fa-regular fa-road-circle-check"></i></span> {data?.access}</p>
                                            </div>

                                            {/* <li>Double Occupancy: 20,000 Rs + 18% GST</li>
                                                    <li>Triple Occupancy: 15,000 Rs + 18% GST</li> */}
                                            <div className='mb-3'>
                                                <p className='mb-1'><strong>Price:</strong></p>
                                                <h4 className='fw-bold'>Indian Nationals:</h4>
                                                <ul className='custom-list fs-7'>
                                                    {data?.prices && Array.isArray(data?.prices) ? (
                                                        data.prices.map((price, index) => (
                                                            price.currency === 1 && (
                                                                <li key={index}>
                                                                    {price.occupancy_type === 1 ? 'Single Occupancy: ' : price.occupancy_type === 2 ? 'Double Occupancy: ' : price.occupancy_type === 3 ? 'Triple Occupancy: ' : ''}
                                                                    {`${price.amount} Rs + ${CONFIG_GST}% GST`}
                                                                </li>
                                                            )
                                                        ))
                                                    ) : (<></>)}
                                                </ul>

                                                <h4 className='fw-bold'> Foreign Nationals</h4>
                                                <ul className='custom-list fs-7'>
                                                    {data?.prices && Array.isArray(data?.prices) ? (
                                                        data.prices.map((price, index) => (
                                                            price.currency === 2 && (
                                                                <li key={index}>
                                                                    {price.occupancy_type === 1 ? 'Single Occupancy: ' : price.occupancy_type === 2 ? 'Double Occupancy: ' : price.occupancy_type === 3 ? 'Triple Occupancy: ' : ''}
                                                                    {`${price.amount} USD + ${CONFIG_GST}% GST`}
                                                                </li>
                                                            )
                                                        ))
                                                    ) : (<></>)}
                                                </ul>
                                                <a className='text-decoration-underline mb-2 text-theme d-block' href="!#" target="_blank" rel="noopener noreferrer">See refund and cancellation policy</a>
                                            </div>
                                                    {/* <li>Double Occupancy: 399 USD + 18% GST</li>
                                                    <li>Triple Occupancy: 299 USD + 18% GST</li> */}

                                            <div className='d-flex flex-column align-items-center gap-3 my-3'>
                                                <Link to={`/user/programs/wellness-retreats/booking/${data?.slug}`}><button  className='wpcf7-form-control wpcf7-submit has-spinner bg-theme'>Proceed to Book</button></Link>
                                                <Link to="/contact-us">More Questions? Request  A Call Back</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProgramDetails
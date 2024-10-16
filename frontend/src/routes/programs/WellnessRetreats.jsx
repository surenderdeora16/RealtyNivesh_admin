import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import AxiosHelper from '../../helper/AxiosHelper';
import { formatDateDDMMYYYY } from '../../helper/StringHelper';

const WellnessRetreats = () => {
    const [data, setData] = useState({ count: 0, record: [], totalPages: 0, pagination: [] });
    const [param, setParam] = useState({ limit: 10, pageNo: 1, query: "", orderBy: 'createdAt', orderDirection: -1 })

    const getDataForTable = useCallback(async () => {
        const { data } = await AxiosHelper.getData("/retreat-datatable", param);
        if (data?.status === true) {
            let { count, totalPages, record, pagination } = data?.data
            setData({ count, totalPages, record, pagination })
        } else {
            toast.error(data?.message);
        }
    }, [param])

    const handelPageChange = (pageNo) => { setParam({ ...param, pageNo }) }

    useEffect(() => { getDataForTable() }, [param])


    return (
        <section className="elementor-section elementor-top-section">
            <Carousel interval={2000} slide indicators={true}>
                <Carousel.Item>
                    <img className='w-100' src="https://dummyimage.com/1200x350.png/733635/fff" alt="" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className='w-100' src="https://dummyimage.com/1200x350.png/E52B50/fff" alt="" />
                </Carousel.Item>
            </Carousel>
            <div className='container pt-5'>
                <div className="row">
                    <div className="col-12">
                        <p className='mb-3 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate itaque voluptatibus nemo perferendis voluptas sequi omnis quidem eligendi eius fugit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur dolore quasi, fugit libero magnam tempora ab animi culpa quibusdam quia!</p>
                        <h2 className='fs-4 fw-bold wp-block-heading pb-2'>Upcoming Retreats</h2>
                    </div>
                    {data?.record && data?.record.map((data, i) => (
                        <div key={i} className="col-lg-6 mb-3">
                            <div className="card flex-lg-row">
                                <img src={data.image} style={{ maxWidth: 200, aspectRatio: 1, objectFit: 'cover' }} className="flex-shrink-0 w-100" alt={data?.name}></img>
                                <div className="card-body d-flex flex-column justify-content-start gap-2">
                                    <h5 className="card-title text-dark ls-normal pb-0">{data?.name}</h5>
                                    <p className="card-text">{`Date : ${formatDateDDMMYYYY(data.check_in)} -  ${formatDateDDMMYYYY(data.check_out)}`}</p>
                                    <div className='w-100 mb-0 mt-auto text-lg-end mb-2'>
                                        <Link to={`/programs/wellness-retreats/${data?.slug}`} className="btn-custom">Book Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className=" row justify-content-center align-items-center mt-3 mb-5">
                <div className="col-auto">
                    <div className="d-flex justify-content-center align-items-center">
                        <button type="button" dd="disabled" className=" btn btn-falcon-default btn-sm" onClick={() => handelPageChange(1)}>
                            <span className="fas fa-chevron-left" />
                        </button>
                        <div className="col px-5">
                            <p className="mb-0 fs--1 ">
                                <span className="d-none d-sm-inline-block" data-list-info="data-list-info">{(param.pageNo - 1) * param.limit + 1} to {param.pageNo * param.limit > data?.count ? data?.count : param.pageNo * param.limit} of {data?.count} </span>
                                <span className="d-none d-sm-inline-block"> </span>
                            </p>
                        </div>
                        <button type="button" className="btn btn-falcon-default btn-sm" onClick={() => handelPageChange(data?.totalPages)}>
                            <span className="fas fa-chevron-right"> </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default WellnessRetreats
import React from 'react'
import { SubBannerImgBrown } from '../../assets/images'

const PageHeader = ({ title = '', subTitle = '', backgroundImage = SubBannerImgBrown }) => {
    return (
        <div className="page-title-area overlay-bg style-1" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12">
                        <h3 className="title text-center"> {title}</h3>
                        <p className='text-center'>{subTitle} <br /></p>
                    </div>
                    {/* <div className="col-sm-12 text-left">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-list"><Link href="/" title="Home ">Home </Link></li>
                            <li className="breadcrumb-list"><Link href="/">{title}</Link></li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default PageHeader
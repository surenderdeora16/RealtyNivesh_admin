import React from 'react'
import PageHeader from '../components/Website/PageHeader'

const RefundPolicy = () => {
    return <div>
        <PageHeader title='CANCELLATION & REFUND POLICY' subTitle='Duis aute irure dolor in reprehenderit in volurate velit cillum nulla pariatur nostrud exercitation.' />
        <div className="container my-4">
            <div className='fw-semi-bold text-justify'>
                <p className='mb-4 lh-normal'><b className='me-2'>1.1.</b>  The participant may cancel the reservation by sending the cancellation request in writing over email to mitra@param.life. The date of receiving such request will be considered as the date of the cancellation.</p>
                <p className='mb-4 lh-normal'><b className='me-2'>1.2.</b>  For bookings cancelled more than 60 days prior to the start date of the program date, 10% deduction will be done towards the processing fee, and 90% of the money will be refunded.</p>
                <p className='mb-4 lh-normal'><b className='me-2'>1.3.</b>  For bookings cancelled between 60 days and 30 days prior to the start date of the program date, 75% of the money will be refunded.</p>
                <p className='mb-4 lh-normal'><b className='me-2'>1.4.</b>  For bookings cancelled 30 days or lesser prior to the start date of the program date, 25% of the money will be refunded.</p>
                <p className='mb-4 lh-normal'><b className='me-2'>1.5.</b>  For bookings cancelled on or after the holiday start date, participant will receive no refund.</p>
                <p className='mb-4 lh-normal'><b className='me-2'>1.6.</b>  For bookings cancelled 7 days or more prior to the start date of the program date due to an Extremely Unavoidable Reason, 80% of the money will be refunded after deducting 20% towards the processing charges. Extremely Unavoidable Reason means any serious illness or injury, death or maternity of the participant or their spouse. The Extremely Unavoidable Reason must have arisen AFTER the date of making the booking, and the participant must supply documentary supporting evidence of the circumstances and the date they occurred to be entitled to the refund detailed in clause 1.1.</p>
                <p className='mb-4 lh-normal'><b className='me-2'>1.7.</b>  Before initiating the refund, PARAM team will communicate the refund amount as per policy to the participant through the registered email id. Upon receiving the bank account details from the participant, the refund amount will be transferred to the same bank account.</p>
                <p className='mb-4 lh-normal'><b className='me-2'>1.8.</b>  In case of cancellation due to Extremely Unavoidable Reason, the participant's reservation will be cancelled when we receive the cancellation request, however refunds will not be issued until adequate supporting documentation has been received, such as a doctor's certification, court notification or death certificate.</p>
                <p className='mb-4 lh-normal'><b className='me-2'>1.9.</b>  For any cancellation due to reasons other than Extremely Unavoidable Reason, refund will be initiated within 15 Days of cancellation date.</p>
                <p className='mb-4 lh-normal'><b className='me-2'>1.10.</b>  PARAM will not be responsible for any delay in refund processing caused by unresponsiveness or delay from the participant in providing the required details and confirmation</p>
            </div>
        </div>
    </div>
}

export default RefundPolicy
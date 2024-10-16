import React from 'react'
import PageHeader from '../components/Website/PageHeader'

const PrivacyPolicy = () => {
    return <div>
        <PageHeader title='Privacy Policy' subTitle='Duis aute irure dolor in reprehenderit in volurate velit cillum nulla pariatur nostrud exercitation.' />
        <div className="container my-4">
            <div className="mb-4">
                <p className='text-justify'>We'd like to assure you that we are committed to protecting the privacy of all our users. We will ensure that the information you provide us with is kept private and confidential, and we will only use it to provide the services you request.</p>
            </div>

            <div className="mb-4">
                <h4 className='fw-bold ls-normal'>Information You Voluntarily Provide</h4>
                <p className='text-justify'>When you complete a booking, sign up to our newsletter, consult with our service team, send us an email, or communicate with us in any way, you are voluntarily giving us information that we collect. That information may include either your name, physical address, email address, IP address, phone number, credit card information, as well as details including gender, location, purchase history, and other demographic information. By giving us this information, you consent to this information being collected, used, disclosed, transferred or stored by the hotel or our third-party providers as described in this privacy policy. In the interest of your privacy, we only collect, use and retain information reasonably required for our legitimate business interests, such as processing bookings and queries or providing you with marketing materials.</p>
            </div>

            <div className="mb-4">
                <h4 className='fw-bold ls-normal'>Information We Automatically Collect</h4>
                <p className='text-justify'>When you browse the website or make a purchase, we may automatically collect information about your visit by using cookies. This information may include your device type, browser, IP address, how you came to the website or how you interacted with the website. This information may be used to monitor or improve website performance or deliver targeted advertising. Information from the cookie alone generally will not identify you personally and we will not use this information in connection with any personally identifiable information you have provided.</p>
            </div>

            <div className="mb-4">
                <h4 className='fw-bold ls-normal'>Information We Share with Third Party Providers</h4>
                <p className='text-justify'>We may share your personally identifiable information with service providers including</p>
                <ul className='list-style-disc'>
                    <li>Payment processors for secure credit card payment transaction.</li>
                    <li>Hosting services.</li>
                    <li>Email service providers to send you emails pertaining to your booking. Such providers may send emails of a marketing nature if you have agreed to receive such newsletters and will track some performance indicators, such as open and click rates.</li>
                    <li>Advertising partners who may use email address, cookies and other tracking technologies, such as pixels and web beacons, to gather information about your activities on our website and other sites to provide you with targeted advertising based on your browsing activities and interests.</li>
                    <li>Our business partners, suppliers, and sub-contractors, for the performance of any contract we enter into with them. We may also share your data with analytics and search engine providers that assist us in the improvement of our website.</li>
                    <li>Legal authorities when we believe in good faith that we are lawfully authorised or required to do so or when necessary to do so to protect the rights and safety of PARAM, employees and users from fraudulent, abusive, inappropriate or unlawful use of our services.</li>
                    <li> In connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition, or in any other situation where personally identifiable information may be disclosed or transferred as one of the business assets of PARAM.</li>
                    <li>Information that is aggregated or anonymised that does not directly identify you.</li>
                </ul>
            </div>

            <div className="mb-4">
                <h4 className='fw-bold ls-normal'>How we protect your information</h4>
                <p className='text-justify'>We take reasonable and appropriate measures to protect Personal Information from loss, misuse and unauthorized access, disclosure, alteration and destruction, considering the risks involved in the processing and the nature of the personal information.</p>
                <p className='text-justify'>Our website is scanned on a regular basis for security holes and known vulnerabilities to make your visit to our site as safe as possible. We use regular Malware Scanning. We implement a variety of security measures when a user makes a booking, enters, submits, or accesses their information to maintain the safety of your personal information.Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit card information you supply is encrypted via Secure Socket Layer (SSL) technology. All transactions are processed through a gateway provider and are not stored or processed on our servers. If a security breach causes an unauthorized intrusion into our system that materially affects you, then PARAM will notify you as soon as possible and later report the action we took in response.</p>
            </div>


            <div className="mb-4">
                <h4 className='fw-bold ls-normal'>Access to Personally Identifiable Information</h4>
                <p className='text-justify'>If your personally identifiable information changes or you wish your information to be removed from our records, you may update or delete it by emailing <a href='mailto:reservations@anandaspa.com' className='text-theme'>mitra@param.life</a>. We will give you access to your personally identifiable information that we hold within 45 days of a request to access. You may send a request to this email address <a href='mailto:reservations@anandaspa.com' className='text-theme'>mitra@param.life</a>.  If you wish to stop receiving email newsletters, click on the unsubscribe link on any of the newsletters. We will retain your information for as long as required to deliver your service, agreement or resolve any issues. Please note that we cannot always delete records of all historical data. For example, we are required to retain certain records for financial reporting and compliance reasons.</p>
            </div>

            <div className="mb-4">
                <h4 className='fw-bold ls-normal'>Third Party Websites</h4>
                <p className='text-justify'>Any information, communications, or materials you submit to us via a social media platform is done at your own risk without any expectation of privacy. We cannot control the actions of other users of these platforms or the actions of the platforms themselves. Your interactions with those features and platforms are governed by the privacy policies of the companies that provide them.</p>
                <p className='text-justify'>Our website includes links to other websites, whose privacy practices may be different from ours. If you submit personally identifiable information to any of those sites, your information is governed by their privacy policies. We encourage you to carefully read the privacy policy of any website you visit.</p>
            </div>

            <div className="mb-4">
                <h4 className='fw-bold ls-normal'>Changes to Privacy Policy</h4>
                <p className='text-justify'>We may make changes to this privacy policy, which come into effect upon updating this page. We recommend reviewing this privacy policy so you are aware of any changes that affect what you are consenting to by interacting with the website, submitting a query, making a booking or otherwise interacting with PARAM.</p>
            </div>

        </div>
    </div>
}

export default PrivacyPolicy
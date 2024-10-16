import Hero from '../sections/Hero';
import OurServices from '../sections/OurServices';
import Testimonial from '../sections/Testimonial';
import AboutUs from '../sections/AboutUs';
import GetInTouch from '../sections/GetInTouch';
import OurPricing from '../sections/OurPricing';

const Home = () => {
    return <div className="elementor elementor-6655">
        <Hero />
        <OurServices />
        <section className='py-5 text-center' style={{ backgroundColor: '#ece9e9' }}>
            <div className="container">
                <div className="elementor-column elementor-inner-column elementor-element elementor-element-4f38ea1 w-100">
                    <div className="elementor-widget-wrap">
                        <div className="elementor-element elementor-element-b84619f elementor-widget elementor-widget-heading">
                            <div className="elementor-widget-container">
                                <h2 className="elementor-heading-title elementor-size-default text-center">Why PARAM</h2>
                            </div>
                        </div>
                        <div className="elementor-element elementor-element-9221f11 elementor-widget elementor-widget-text-editor">
                            <div className="elementor-widget-container lh-normal text-justify mb-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum id quae optio, officiis magnam labore quia ea? Quo cupiditate est ipsa non perspiciatis laudantium dolore ducimus aperiam atque nobis? Nesciunt architecto ea facilis illum velit? Explicabo, consequuntur eligendi. Explicabo cumque adipisci pariatur quam ab, fugiat nemo iure odio laudantium, ipsam unde aliquid facere maiores. Iste quam ex quod, distinctio officia, ratione itaque corrupti hic eaque velit laborum iusto voluptatem nobis! Magnam hic sit, culpa iure alias voluptatum corporis et! Quam eligendi voluptas mollitia aperiam! Beatae excepturi aliquam commodi accusantium impedit cum iste natus similique optio amet possimus laborum, eaque in?
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <OurPricing />
        <AboutUs />
        <Testimonial />
        <GetInTouch />
    </div>
}

export default Home




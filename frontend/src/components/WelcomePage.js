import React from 'react';

// import aos
import Aos from 'aos';
// import aos css
import 'aos/dist/aos.css';

// import components
import Header from './Header';
import Hero from './Hero';
import Overview from './Overview';
import Brands from './Brands';
import Feature1 from './Feature1';
import Feature2 from './Feature2';
import Feature3 from './Feature3';
import Feature4 from './Feature4';

import Product from './Product';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import Cta from './Cta';
import Footer from './Footer';

const WelcomePage = () => {
  // initialize aos
  Aos.init({
    duration:1800,
    offset:100,
  })
  return (
    <div className='overflow-hidden '>
      <Header />
      <Hero />
      <Overview />
      <Brands />
      <Feature1 />
      <Feature2 />
      <Feature3 />
      <Feature4 />
      <Product />
      <Pricing />
      <Testimonials />
      <Cta />
      <Footer />
      <div className='h-[100px]'></div>
    </div>
  );
};

export default WelcomePage;

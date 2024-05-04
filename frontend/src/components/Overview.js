import React from 'react';
//import data
import { overview } from '../data';

const Overview = () => {
  const {productImg } = overview;
  return (
    <section className='lg:min-h-[512px] bg-overview bg-cover bg-left-top pt-[30px] lg:pt-[87px]'>
      <div className='container mx-auto flex justify-end overflow-hidden'>
        <img src={productImg} alt='' data-aos="fade-up" data-aos-offset ='300' ></img>
        {/* <img className='lg:h-[520PX] w-[520PX] rounded-md ' src={productImg} alt='' data-aos="fade-up" data-aos-offset ='300' ></img> */}
      </div>
    </section>
  );
};

export default Overview;

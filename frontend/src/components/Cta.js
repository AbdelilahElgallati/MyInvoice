import React from 'react';
import { cta } from '../data';
// import icons ;
import { HiOutlineChevronDoubleRight } from 'react-icons/hi';
const Cta = () => {
  const {title , subtitle, btnText , img1 , img2} = cta;
  return (
    <section className='section bg-cta bg-cover bg-left-top '>
      <img className='hidden xl:flex lg:w-[46%] lg:absolute lg:mt-[-191px] lg:ml-[-230px]' src={img1} alt=''
          data-aos= 'zoom-out-right'
          data-aos-delay='700'
          />
      <div className='max-w-[1340px] mx-auto px-[25px] lg:ml-[150px]'>
        
        {/* text */}
        <div className='max-w-[920pw] mx-auto text-center'>
          <h2 className='h2 text-white mb-6'
          data-aos= 'fade-up'
          data-aos-delay='200'>
           { title}
          </h2>
          <p className='text-2xl font-Quicksand font-semibold lg:text-4xl text-white'
          data-aos= 'fade-up'
          data-aos-delay='300'>
            {subtitle}
          </p>
        </div>
        {/* btn images */}
        <div className='flex justify-between'>
          {/* <img className='hidden xl:flex lg:w-[46%] lg:absolute lg:mt-[-271px] lg:ml-[-150px]' src={img1} alt=''
          data-aos= 'zoom-out-right'
          data-aos-delay='700'
          /> */}
          <button className='btn btn-md btn-white mt-[40px] lg:text-[22px] gap-x-[10px] mx-auto font-Quicksand font-semibold'
          data-aos= 'fade-up'
          data-aos-delay='400'
          >
            {btnText} <HiOutlineChevronDoubleRight/>
          </button>
         
          
        </div>
      </div>
    </section>
  );
};

export default Cta;

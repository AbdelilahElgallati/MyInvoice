import React , { useEffect, useState } from "react";
import { features } from '../data';
const Feature3 = () => {
  
  const {feature3} = features;
  const { pretitle , title , subtitle , btnLink , btnIcon , image }= feature3;

  return <section className=' dark:bg-black section '>
    <div className='container mx-auto'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:gap-x-[30px]'>
        {/* text */}
        <div className=' mb-[20px]   lg:mb-[0px] flex-1' data-aos = "fade-right" data-aos-offset ='400' >
          <div className=' dark:text-white pretitle'>{pretitle}</div>
          <div className='dark:text-white title'>{title}</div>
          <div className='dark:text-white lead'>{subtitle}</div>
          {/* <button className='btn-link flex items-center gap-x-3 hover:gap-x-5 transition-all font-Quicksand font-semibold'>
            {btnLink} <img src={btnIcon} alt=''></img>
          </button> */}
        </div>
        {/* image */}
        <div className='flex-1'  data-aos = "fade-right" data-aos-offset ='300'>
          <img className ='rounded-lg' src= {image} ></img>
        </div>
      </div>
    </div>
  </section>;
};

export default Feature3;

import React , { useEffect, useState } from "react";
import { features } from '../data';
import { useNavigate } from 'react-router-dom';
const Feature1 = () => {
  
  const {feature1} = features;
  const { pretitle , title , subtitle , btnLink , btnIcon , image }= feature1;
  const navigate = useNavigate();
  const handleModelClick = () => {
    // Redirige vers la page de connexion lorsque le bouton est cliqué
    navigate('/Modeles');
  };
  return <section className=' dark:bg-black section '>
    <div className='container mx-auto'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:gap-x-[30px]'>
        {/* text */}
        <div className='flex-1' data-aos = "fade-right" data-aos-offset ='400' >
          <div className=' dark:text-white pretitle '>{pretitle}</div>
          <div className=' dark:text-white title '>{title}</div>
          <div className='dark:text-white lead '>{subtitle}</div>
          <button className='btn-link flex items-center gap-x-3 hover:gap-x-5 transition-all font-Quicksand font-semibold'
           onClick={handleModelClick}>
            {btnLink} <img src={btnIcon} alt=''></img>
          </button>
        </div>
        {/* image */}
        <div className='flex-1'  data-aos = "fade-right" data-aos-offset ='300'>
          <img className ='rounded-lg' src= {image} ></img>
        </div>
      </div>
    </div>
  </section>;
};

export default Feature1;

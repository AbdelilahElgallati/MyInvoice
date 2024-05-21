/* eslint-disable react-hooks/exhaustive-deps */
import React , { useEffect, useState } from "react";
import { hero } from '../data';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import tr from "Services/tr";
import Cookies from "js-cookie";


const Hero = () => {
   // useState de  translatedData
  const [title,setTitle] = useState(hero.title);
  const [subtitle,setSubtitle] = useState(hero.subtitle);
  const [btnText,setBtnText] = useState(hero.btnText);
  // const [translatedData, setTranslatedData] = useState([]);
   var trText = "";
   useEffect(() => {
     const langto = Cookies.get("to");
     // fonction multiThreads
     const translateData = async () => {
      if (langto !== "fra" && langto) {
        trText = await tr(title , "fra", langto);
        setTitle(trText);
        trText = await tr(subtitle , "fra", langto);
        setSubtitle(trText)
        trText = await tr(btnText , "fra", langto);
        setBtnText(trText)
      }
     };
 
     translateData();
   }, []);
  const { image } = hero;
  
  const navigate = useNavigate();
  const handleLoginClick = () => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const redirectPath = userId ? `${userName}/ajouterFacture` : "/login";
    navigate(redirectPath);
  }
  return (
    // margin-top: 82px;
    // padding-top: 147Px;
    <section className=' dark:bg-black    mt-[70px]  lg:mt-[130px]'>
      <div className=' container mx-auto  flex justify-center items-center lg:mt-[-47px] lg:pt-[30px] '>
        <div className='xl:mt-[-230px]  mt-[0px] flex flex-col lg:gap-x-[30px] gap-y-8 lg:flex-row items-center justify-center text-center lg:text-left'>
          {/* text */}
          <div className='flex-1 mt-[103px] lg:mt-[100px] '>
            <h1
              className='dark:text-white text-4xl  title mb-2 lg:mb-5 font-Quicksand  font-bold'
              data-aos='fade-down'
              data-aos-delay='1200' // Correction ici
            >
              {title}
            </h1>
            <p
              className='dark:text-gray-500 text-md font-Quicksand lead mb-5 lg:mb-10'
              data-aos='fade-down'
              data-aos-delay='1200' // Correction ici
            >
              {subtitle}
            </p>
            <div
              className=' max-w-sm lg:max-w-full mx-auto lg:mx-0 gap-x-2 lg:gap-x-6'
              data-aos='fade-down'
              data-aos-delay='1200' // Correction ici
            >
              <button className='btn btn-md lg:btn-lg btn-accent flex justify-center items-center lg:gap-x-4 md:ml-0'
               onClick={handleLoginClick}>
                {btnText}
                <HiOutlineChevronDown />
              </button>
            </div>
          </div>
          <div
            className='flex-1 lg:mt-[100px]'
            data-aos='fade-up'
            data-aos-delay='1200' // Correction ici
          >
            <img  className=' lg:ml-[120px]' src={image} alt="hero" /> 
          </div>
        </div>
      </div>
    </section>
  )
};

export default Hero;

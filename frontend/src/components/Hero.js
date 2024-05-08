import React , { useEffect, useState } from "react";
import { hero } from '../data';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [theme, setTheme] = useState(localStorage.getItem("currentMode"));
  console.log(theme);
  useEffect(() => {
    const storedTheme = localStorage.getItem("currentMode");
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);
  function toggletheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme); // Mettre à jour l'état theme
    localStorage.setItem("currentMode", newTheme); // Mettre à jour le stockage local
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  const { title, subtitle, btnText, compText, image } = hero;
  const navigate = useNavigate();
  const handleLoginClick = () => {
    // Redirige vers la page de connexion lorsque le bouton est cliqué
    navigate('/Login');
  };
  return (
    <section className=' dark:bg-black min-h-[900px]  py-12 mt-[90px]  lg:mt-[50px]'>
      <div className=' container mx-auto min-h-[900px] flex justify-center items-center '>
        <div className='xl:mt-[-230px]  md: mt-0 flex flex-col lg:gap-x-[30px] gap-y-8 lg:flex-row items-center justify-center text-center lg:text-left'>
          {/* text */}
          <div className='flex-1'>
            <h1
              className='dark:text-white text-4xl  title mb-2 lg:mb-5 font-Quicksand  font-bold'
              data-aos='fade-down'
              data-aos-delay='500' // Correction ici
            >
              {title}
            </h1>
            <p
              className='dark:text-white text-xl font-Quicksand lead mb-5 lg:mb-10'
              data-aos='fade-down'
              data-aos-delay='500' // Correction ici
            >
              {subtitle}
            </p>
            <div
              className=' max-w-sm lg:max-w-full mx-auto lg:mx-0 gap-x-2 lg:gap-x-6'
              data-aos='fade-down'
              data-aos-delay='700' // Correction ici
            >
              <button className='btn btn-md lg:btn-lg btn-accent flex justify-center items-center lg:gap-x-4 md:ml-0'
               onClick={handleLoginClick}>
                {btnText}
                <HiOutlineChevronDown />
              </button>
            </div>
          </div>
          <div
            className='flex-1'
            data-aos='fade-up'
            data-aos-delay='800' // Correction ici
          >
            <img  className='lg:ml-[120px]' src={image} alt="hero" /> 
          </div>
        </div>
      </div>
    </section>
  )
};

export default Hero;

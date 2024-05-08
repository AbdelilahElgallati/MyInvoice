import React , { useEffect, useState } from "react";

import { product } from '../data';
import Cards from './Cards';  
const Product = () => {
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
  // destructure product data
  const {title , subtitle} = product ;
  return <section className=' dark:bg-black section'>
    <div className='container mx-auto '>
      {/* title subtitle */}
      <div className='flex flex-col items-center
       lg:flex-row mb-10 lg:mb-20 lg:ml-[90px]'>
        <h2 className='dark:text-white section-title '
         data-aos="fade-up"
         data-aos-offset='400'
         data-aos-delay='300'
        > {title}
        </h2>
        <p className='lead lg:max-w-[350px] lg:ml-[80px] lg:mt-[100px] '
         data-aos="fade-up"
         data-aos-offset='400'
         data-aos-delay='300'
        >{subtitle}
        </p>
      </div>
      {/* card */}
      <Cards />
    </div>
  </section>;
};

export default Product;

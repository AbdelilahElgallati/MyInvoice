import React , { useEffect, useState } from "react";

import { testimonials } from '../data';
import ClientSlider from '../components/ClientSlider';
const Testimonials = () => {
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
  const {title , clients} = testimonials;
  return (
    <section className='dark:bg-black section'>
      <div className='container mx-auto'>
        {/* title */}
        <h2 className='dark:text-white title mb-10 lg:mb-20 text-center max-w-[920px] mx-auto'
        data-aos= 'fade-up'
        data-aos-delay='200'
        >
          {title}
        </h2>
        {/* slider */}
        <div   data-aos= 'fade-up'
        data-aos-delay='400'> 
          <ClientSlider clients ={clients} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
import React , { useEffect, useState } from "react";

import { copyright } from '../data';
const Copyright = () => {
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
  const {link1 , link2 , copyText , social }= copyright;
  return <div className='dark:bg-black flex flex-col items-center gap-y-2 lg:flex-row lg:justify-between'
  data-aos='fade-up' data-aos-offset='0' data-aos-delay='200'>
    {/* links */}
    <div className='flex gap-x-6'>
      <a className='hover:text-accent transition font-Quicksand font-medium dark:text-white' href={link1.href}>
        {link1.name}
      </a>
    </div>
    {/* copyright text */}
    <div className='font-Quicksand font-medium dark:text-white'>{copyText}</div>
    {/* social icons */}
    <ul className='flex gap-x-[12px]'>
    {social.map((item, index)=>{
      const {href,icon}=item;
      return(
        <li key={index}>
          <a href={href}>
            <img src={icon} alt=''/>
          </a>
        </li>
      );
    })}
    </ul>
  </div>;
};

export default Copyright;

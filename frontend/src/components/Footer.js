import React, { useEffect, useState } from "react";
import {footer} from '../data';
import Copyright from '../components/Copyright';

const Footer = () => {
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
  const { logo , links , legal , newsletter , form }= footer;
  return <footer className=' dark:bg-black pt-[142px] pb-[60px]'>
    <div className='  container mx-auto'>
      <div className='flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left lg:justify-between gap-y-8'>
      {/* logo */}
      <div data-aos='fade-up' data-aos-offset='200' data-aos-delay='300'>
        <img  className="w-[160px]" src={logo} alt=''/>
      </div>
      {/* list 1 */}
      <div data-aos='fade-up' data-aos-offset='200' data-aos-delay='500'>
        <div className=' dark:text-white  text-2xl uppercase font-Quicksand  font-medium mb-6'>Links</div>
        <ul className=' dark:text-white flex flex-col gap-y-3'>
          {links.map((item , index)=>{
            // destructure item 
            const {href , name }= item;
            return (
              <li key={index}>
                <a className='font-medium hover:text-accent transition font-Quicksand font-medium' href={href}>{name}</a>
              </li>
            )
          })}
        </ul>
      </div>
       {/* list 2 */}
       <div data-aos='fade-up' data-aos-offset='200' data-aos-delay='700'>
        <div className='dark:text-white  text-2xl uppercase font-Quicksand font-medium mb-6'>Legal</div>
        <ul className=' dark:text-white flex flex-col gap-y-3'>
          {links.map((item , index)=>{
            // destructure item 
            const {href , name }= item;
            return (
              <li key={index}>
                <a className='font-medium hover:text-accent transition font-Quicksand font-medium' href={href}>{name}</a>
              </li>
            )
          })}
        </ul>
      </div>
      {/* newsletter */}
      <div data-aos='fade-up' data-aos-offset='200' data-aos-delay='900' >
        <div className='dark:text-white text-2xl uppercase  mb-6 font-Quicksand font-medium'>{newsletter.title}</div>
        <div className='dark:text-white text-xl text-light mb-[18px] font-Quicksand font-medium' >{newsletter.subtitle}</div>
        {/* form */}
        <form className=' max-w-[349px] mb-[10px]'>
        <div className='h-[62px] p-[7px] flex border border-dark rounded-lg'>
          <input className='w-full h-full pl-6 border-none outline-none'
           type='text'
           placeholder={form.placeholder}
          />
          <button className='btn btn-sm bg-accent hover:bg-accentHover 
           w-[102px] text-white font-Quicksand font-medium'>{form.btnText}</button>
        </div>
        </form>
        <span className='text-sm text-light font-Quicksand font-medium'>{form.smallText}</span>
      </div>
      </div>
      <hr className='mt-10 mb-5'
     data-aos='fade-up' data-aos-offset='100' data-aos-delay='200' 
    />
      <Copyright/>
    </div>
  </footer>;
};

export default Footer;

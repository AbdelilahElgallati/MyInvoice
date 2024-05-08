import React , { useEffect, useState } from "react";

import { pricing } from "../data";
import { HiCheck, HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useGetPacksQuery } from "state/api";
const Pricing = () => {
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
  const [index, setIndex] = useState(1);
  const { title, cards } = pricing;
  

  return (
    <section className="dark:bg-black section">
      <div className="container mx-auto">
        {/* title */}
        <h2
          className=" dark:text-white h2 mb-10 lg:mb-20 text-center font-Quicksand font-bold"
          data-aos="fade-up"
          data-aos-offset="200"
        >
          {title}
        </h2>
        {/* card */}
        <div className="flex flex-col lg:flex-row lg:gap-x-[30px] gap-y-[30px] lg:gap-y-0 justify-center items-center">
          {cards.map((card, cardIndex) => {
            const { icon, title, services, price, userAmount, btnText, delay } =
              card;
            //card
            return (
              <div
                key={cardIndex}
                data-aos="fade-up"
                data-aos-delay={delay}
                data-aos-offset="300"
              >
                <div
                  onClick={() => setIndex(cardIndex)}
                  className={`${
                    cardIndex === index
                      ?  "dark:bg-slate-800 bg-white shadow-2xl"
                      : "border border-gray"
                  } w-[350px] h-[550px] rounded-[12px] p-[40px] cursor-pointer transition-all`}
                >
                  {/* card icon */}
                  <div className="mb-8">
                    <img src={icon} alt="" />
                  </div>
                  {/* card title */}
                  <div className="dark:text-white text-[32px] font-Quicksand font-semibold mb-8">
                    {title}
                  </div>
                  {/* card services */}
                  <div className="flex flex-col gap-y-2 mb-6">
                    {services.map((service, index) => {
                      const { name } = service;
                      return (
                        <div
                          className="flex items-center gap-x-[10px]"
                          key={index}
                        >
                          <HiCheck className="text-light" />
                          <div className=" dark:text-white font-Quicksand font-semibold">
                            {name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mb-10">
                    <div>
                      <span className="dark:text-white text-2xl font-Quicksand font-semibold">
                        {price}
                      </span>
                      <span className=" dark:text-white text-xl text-light font-Quicksand font-semibold">
                        {" "}
                        year
                      </span>
                    </div>
                    <div className=" dark:text-white text-base text-light">{userAmount}</div>
                  </div>
                  {/* btn */}
                  <button
                    className={`${
                      cardIndex === index
                        ? "bg-accent hover:bg-accentHover text-white"
                        : "border border-accent text-accent"
                    } btn btn-sm space-x-[14px]`}
                  >
                    <span>{btnText}</span>
                    <HiOutlineArrowNarrowRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* Voir plus */}
        <div className="flex justify-center items-center mt-10"
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-offset="300">
          <a
            href="/pack"
            className="inline-flex  items-center mt-[20px] inline-block bg-accent text-white font-Quicksand font-semibold py-2 px-4 rounded-md hover:bg-accentHover "
          >
            Voir Plus <span className="ml-[10px]"> <HiOutlineArrowNarrowRight /></span> 
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

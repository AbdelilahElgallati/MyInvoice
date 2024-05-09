import React , { useEffect, useState } from "react";
import { modelData } from "../../data";
import backgroundImage from "../../assets/img/Modeles/b1.png";
import Header from "components/Header";
import Footer from "components/Footer";

import { useContext } from 'react';

const Model = () => {
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
  return (
    <>
      <Header />
      {modelData.map((data, index) => (
        <div key={index}>
          <img
            src={data.imageDark} // Sélectionnez l'image en fonction du thème
            className="mt-[150px] lg:mt-[100px] w-full h-auto"
            alt="Background"
          />
          <div className="flex bg-slate-100 dark:bg-black flex-wrap justify-evenly w-full h-full pb-[40Px]">
            {data.sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="m-[10px] w-[430px] h-[250px] p-[30px]"
              >
                <img
                  src={section.image}
                  alt=""
                  className=" mb-[20px] w-[14%] ml-[100Px]"
                />
                <h1 className=" hover:text-accentHover dark:text-white font-Quicksand font-bold">
                  {section.title}
                </h1>
                <p className="font-Quicksand font-medium dark:text-white text-sm">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Footer/>
    </>
  );
};

export default Model;

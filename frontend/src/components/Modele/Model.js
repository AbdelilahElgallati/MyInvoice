import React from "react";
import { modelData } from "../../data";
import Header from "components/Header";
import Footer from "components/Footer";

const Model = () => {
  const { title, imageDark, sections } = modelData[0]; // Assuming there's only one object in modelData

  return (
    <>
      <Header />
      <div className="dark:bg-black lg:flex justify-evenly mt-[90PX] ">
        <div className="pt-[100px]  lg:ml-[140px]">
          <h1 className="dark:text-white mb-[20px] text-4xl font-Quicksand font-bold text-center ">
            {title}
          </h1>
        </div>
        <div className="">
          <img
            src={imageDark}
            alt=""
            className="w-[50%] lg:w-[25%] ml-[120px]  lg:mb-[50px] lg:ml-[500px] "
          />
        </div>
      </div>
      <div className="flex bg-slate-100 dark:bg-black flex-wrap justify-evenly w-full h-full pb-[40Px]">
        {sections &&
          sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="m-[10px] w-[430px] h-[250px] p-[30px]"
            >
              <img
                src={section.image}
                alt=""
                className="mb-[20px] w-[14%] ml-[100Px]"
              />
              <h1 className="hover:text-accentHover dark:text-white font-Quicksand font-bold">
                {section.title}
              </h1>
              <p className="font-Quicksand font-medium dark:text-white text-sm">
                {section.description}
              </p>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
};

export default Model;

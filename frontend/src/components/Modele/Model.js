import React from "react";
import { modelData } from "../../data";
import backgroundImage from "../../assets/img/Modeles/b1.png";
import Header from "components/Header";
const Model = () => {
  return (
    <>
      <Header />
      {modelData.map((data, index) => (
        <div key={index}>
          <img
            src={data.image}
            className="mt-[150px] lg:mt-[100px] w-full h-auto"
            alt="Background"
          />
          <div className="flex bg-slate-100 flex-wrap justify-evenly w-full h-full pb-[40Px]">
            {data.sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="m-[10px] w-[430px] h-[250px] p-[30px]"
              >
                <img
                  src={section.image}
                  alt=""
                  className="w-[14%] ml-[150Px]"
                />
                <h1 className="flex justify-center hover:text-accentHover font-semibold text-xl">
                  {section.title}
                </h1>
                <p className="ml-[10Px]">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Model;

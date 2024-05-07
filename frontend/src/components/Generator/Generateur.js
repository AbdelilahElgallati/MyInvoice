import Header from "components/Header";
import React from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { generatorData } from "../../data"; 
import Copyright from "components/Copyright";
const Generateur = () => {
  const {
    headerText,
    headerDescription,
    createButtonText,
    imgGenerator,
    f1Img,
    howItWorksTitle,
    howItWorksDescription,
    steps,
    sectext,
    sectitle,
  } = generatorData;

  return (
    <>
      <Header />
      <div className="bg-slate-100 lg:flex justify-evenly mt-[100PX]">
        <div className="pl-[45px] pt-[100px]">
          <h1 className="mb-[20px] text-4xl font-Quicksand font-bold">
            {headerText}
          </h1>
          <p className="font-Quicksand font-medium">{headerDescription}</p>
          <a
            href="#"
            className="inline-flex items-center mt-[20px] inline-block bg-accent text-white font-Quicksand font-semibold py-2 px-4 rounded-md hover:bg-accentHover "
          >
            {createButtonText}
            <span className="ml-2">
              <HiOutlineChevronRight />
            </span>
          </a>
        </div>
        <div className="">
          <img
            src={imgGenerator}
            alt=""
            className="w-[100%] lg:w-[75%] lg:mr-[450px] lg:mb-[50px] lg:ml-[150px] mt-[-66px]"
          />
        </div>
      </div>

      <div className="lg:flex justify-evenly mt-[100PX]">
        <div className="">
          <img src={f1Img} className="w-[80%] m-[40px] rounded-xl" alt="" />
        </div>
        <div className="w-[100%] lg:w-[80%] pl-[40px] pr-[20px] lg:pt-[150px] lg:px-[50px]">
          <h1 className="mb-[20px] text-3xl font-Quicksand font-bold">
            {sectitle}
          </h1>
          <p className="font-Quicksand font-medium">
            {sectext}
          </p>
        </div>
      </div>
      <div className="bg-overview bg-cover pt-10 pb-10 md:pb-20 px-4 md:px-0">
        <h1 className="text-3xl font-Quicksand font-bold text-center">
        {howItWorksTitle}
        </h1>
        <p className="font-Quicksand font-medium text-center mt-8 mb-10 md:mb-20">
        {howItWorksDescription}
        </p>
        <div className="flex flex-wrap justify-center md:justify-evenly">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-full md:w-[40%] mb-10 md:mb-0 md:mr-5"
            >
              <img src={step.image} alt="" className="w-[20%]" />
              <h1 className="text-3xl font-Quicksand font-bold">
                {step.title}
              </h1>
              <p className="font-Quicksand font-medium text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Copyright />
    </>
  );
};

export default Generateur;
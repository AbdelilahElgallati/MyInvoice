import Header from "components/Header";
import React, { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { generatorData } from "../../data"; 
import Footer from "components/Footer";
import tr from "Services/tr";
import Cookies from "js-cookie";

const Generateur = () => {
  const { imgGenerator, f1Img, steps } = generatorData;

  const [translatedData, setTranslatedData] = useState([]);
  const [headerText, setHeaderText] = useState(generatorData.headerText);
  const [headerDescription, setHeaderDescription] = useState(generatorData.headerDescription);
  const [howItWorksDescription, setHowItWorksDescription] = useState(generatorData.howItWorksDescription);
  const [createButtonText, setCreateButtonText] = useState(generatorData.createButtonText);
  const [howItWorksTitle, setHowItWorksTitle] = useState(generatorData.howItWorksTitle);
  const [sectext, setSectext] = useState(generatorData.sectext);
  const [sectitle, setSectitle] = useState(generatorData.sectitle);

  useEffect(() => {
    const translateData = async () => {
      const langTo = Cookies.get("to");

      if (langTo && langTo !== "fra") {
        setHeaderText(await tr(headerText, "fra", langTo));
        setHeaderDescription(await tr(headerDescription, "fra", langTo));
        setCreateButtonText(await tr(createButtonText, "fra", langTo));
        setHowItWorksTitle(await tr(howItWorksTitle, "fra", langTo));
        setHowItWorksDescription(await tr(howItWorksDescription, "fra", langTo));
        setSectext(await tr(sectext, "fra", langTo));
        setSectitle(await tr(sectitle, "fra", langTo));
        const translatedItems = await Promise.all(
          // pour exécuter plusieurs promesses en parallèle. Cela signifie que toutes les promesses à l'intérieur de Promise.all doivent se terminer avant que la fonction ne continue.
          steps.map(async (item) => {
            const it = item;
            console.log(item);
            if (langTo != "fra" && langTo) {
              it.title = await tr(item.title, "fra", langTo);
              it.description = await tr(item.description, "fra", langTo);
            }
            // Test de premiere fois : (data par default c'est fra)
            return { ...it };
          })
        );
        setTranslatedData(translatedItems);

   
      }
    };

    translateData();
  }, [steps, headerText, headerDescription, createButtonText, howItWorksTitle, howItWorksDescription, sectext, sectitle]);

  const id = localStorage.getItem("userId");

  return (
    <div className="dark:bg-black">
      <Header />
      <div className="dark:bg-black bg-slate-100 lg:flex justify-evenly mt-[90PX]">
        <div className="pl-[45px] pt-[100px]">
          <h1 className="dark:text-white mb-[20px] text-4xl font-Quicksand font-bold">
            {headerText}
          </h1>
          <p className="font-Quicksand font-medium dark:text-white">{headerDescription}</p>
          <a
            href={id ? "/ajouterFacture" : "/login"}
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

      <div className="dark:bg-black lg:flex mb-[20px] justify-evenly mt-[-80px] lg:mt-[0px]  ">
        <div className="">
          <img src={f1Img} className="w-[80%] m-[40px] rounded-xl" alt="" />
        </div>
        <div className="w-[100%] lg:w-[80%] pl-[40px] pr-[20px] lg:pt-[150px] lg:px-[50px]">
          <h1 className="dark:text-white mb-[20px] text-3xl font-Quicksand font-bold">
            {sectitle}
          </h1>
          <p className="dark:text-white font-Quicksand font-medium">
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
          {translatedData.map((step, index) => (
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

      <Footer />
    </div>
  );
};

export default Generateur;

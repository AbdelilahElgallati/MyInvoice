import React , { useEffect,  useState } from "react";
import { modelData } from "../../data";
import Header from "components/Header";
import Footer from "components/Footer";
import { useGetAllModelsQuery } from "state/api";

const Model = () => {
  const [index, setIndex] = useState(0); 
  const { title, imageDark, sections } = modelData[0]; // Assuming there's only one object in modelData
  const { data } = useGetAllModelsQuery();
  useEffect(() => {
    if (data && data.length > 0) {
      setIndex(0);
    }
  }, [data]);

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
            className="ml-[160px] lg:ml-[0px] w-[50%] lg:w-[25%] ml-[120px]  lg:mb-[50px] lg:ml-[500px] "
          />
        </div>
      </div>
      <div className="flex bg-slate-100 dark:bg-black flex-wrap justify-evenly w-full h-full pb-[40Px]">
        {data &&
          data.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="m-[10px] w-[430px] h-[250px] p-[30px]"
            >
              <img
                src={`http://localhost:3001/Images/${section.icon}`}
                alt=""
                className="mb-[20px] w-[14%] ml-[100Px]"
              />
              <h1 className="hover:text-accentHover dark:text-white font-Quicksand font-bold">
                {section.name}
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

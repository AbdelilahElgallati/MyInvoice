import Header from "components/Header";
import Footer from "components/Footer";
import React, { useState } from "react";
import imgPay from "../../assets/img/Pack/pay.png";
import { pack } from "../../data";
import { useGetAllPacksThreeServiceQuery } from "state/api";
import { HiCheck, HiOutlineArrowNarrowRight } from "react-icons/hi";
const Abonement = () => {
  const [index, setIndex] = useState(1);
  // const { title } = pricing;
  const { Title, Subtitle } = pack;
  const { data } = useGetAllPacksThreeServiceQuery();
  console.log("data : ", data)
  return (
    <>
      <Header />
      <div className=" dark:bg-black lg:flex justify-between mt-[90Px]">
        <div
          className="lg:w-[50%] w-[100%] pt-[100PX] "
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-offset="300"
        >
          <h1 className="dark:text-white text-3xl font-Quicksand font-bold text-center">
            {Title}
          </h1>
          <p className="dark:text-white text-center font-Quicksand font-medium">
            {Subtitle}
          </p>
        </div>
        <div
          className="lg:w-[50%] w-[100%]  flex justify-center items-center"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-offset="300"
        >
          <img
            src={imgPay}
            className="lg:w-[50%] w-[100%] rounded-xl mt-[10px]"
          />
        </div>
      </div>
      <div className=" dark:bg-black pt-[20px]">
        <h1
          className=" mb-[20px] text-3xl font-Quicksand font-bold text-center dark:text-white"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-offset="300"
        >
          Nos <span className="text-accent">abonnements</span>{" "}
        </h1>
        <div className="dark:bg-black flex flex-wrap justify-center lg:justify-evenly gap-y-[30px] lg:gap-y-[30px] lg:gap-x-[40px] lg:w-full items-center">
        {data && data.map((pack, packIndex) => {
            const { name, services, price ,logo } = pack;
            //card
            return (
              <div
                key={packIndex}
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-offset="300"
              >
                <div
                  onClick={() => setIndex(packIndex)}
                  className={`${
                    packIndex === index
                      ?  "dark:bg-slate-800 bg-white shadow-2xl"
                      : "border border-gray"
                  } w-[350px] h-[550px] rounded-[12px] p-[40px] cursor-pointer transition-all`}
                >
                  {/* card icon */}
                  <div className="mb-8">
                    <img src={`http://localhost:3001/Images/${logo}`} alt=""  />
                  </div>
                  {/* card title */}
                  <div className="dark:text-white text-[32px] font-Quicksand font-semibold mb-8">
                    {name}
                  </div>
                  {/* card services */}
                  <div className="flex flex-col gap-y-2 mb-6">
                    {services.map((service, index) => {
                      const { serviceId } = service;
                      return (
                        <div
                          className="flex items-center gap-x-[10px]"
                          key={index}
                        >
                          <HiCheck className="text-light" />
                          <div className=" dark:text-white font-Quicksand font-semibold">
                            {serviceId.ServiceName}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mb-10">
                    <div>
                      <span className="dark:text-white text-2xl font-Quicksand font-semibold">
                       ${price} 
                      </span>
                      <span className=" dark:text-white text-xl text-light font-Quicksand font-semibold">
                        {" "}
                        /year
                      </span>
                    </div>
                    <div className=" dark:text-white text-base text-light">Jusqu'a 3 facture par mois</div>
                  </div>
                  {/* btn */}
                  <button
                    className={`${
                      packIndex === index
                        ? "bg-accent hover:bg-accentHover text-white"
                        : "border border-accent text-accent"
                    } btn btn-sm space-x-[14px]`}
                  >
                    <span>Commencer maintenent</span>
                    <HiOutlineArrowNarrowRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Abonement;

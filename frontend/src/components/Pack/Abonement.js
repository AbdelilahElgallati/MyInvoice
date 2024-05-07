import Header from "components/Header";
import Footer from "components/Footer";
import React, { useState } from "react";
import imgPay from "../../assets/img/Pack/pay.png";
import { pricing , pack } from "../../data";
import { HiCheck, HiOutlineArrowNarrowRight } from "react-icons/hi";
const Abonement = () => {
    const [index, setIndex] = useState(1);
    const { title, cards } = pricing;
    const { Title, Subtitle } = pack;
  return (
    <>
      <Header />
      <div className="lg:flex justify-between mt-[100Px]">
        <div className="lg:w-[50%] w-[100%] pt-[100PX] "
         data-aos="fade-up"
         data-aos-delay="300"
         data-aos-offset="300"
        >
          <h1 className=" text-3xl font-Quicksand font-bold text-center">
            {Title}
          </h1>
          <p className="text-center font-Quicksand font-medium">
            {Subtitle}
          </p>
        </div>
        <div className="lg:w-[50%] w-[100%]  flex justify-center items-center"
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-offset="300"
        >
          <img src={imgPay} className="lg:w-[50%] w-[100%]" />
        </div>
      </div>
       <h1 className=" text-3xl font-Quicksand font-bold text-center" 
       data-aos="fade-up"
       data-aos-delay="300"
       data-aos-offset="300"
       >Nos <span className="text-accent" >abonnements</span> </h1>
      <div className=" mt-[100px] flex flex-col lg:flex-row lg:gap-x-[30px] gap-y-[30px] lg:gap-y-0 justify-center items-center">
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
                      ? "bg-white shadow-2xl"
                      : "border border-gray"
                  } w-[350px] h-[550px] rounded-[12px] p-[40px] cursor-pointer transition-all`}
                >
                  {/* card icon */}
                  <div className="mb-8">
                    <img src={icon} alt="" />
                  </div>
                  {/* card title */}
                  <div className="text-[32px] font-Quicksand font-semibold mb-8">
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
                          <div className="font-Quicksand font-semibold">
                            {name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mb-10">
                    <div>
                      <span className="text-2xl font-Quicksand font-semibold">
                        {price}
                      </span>
                      <span className="text-xl text-light font-Quicksand font-semibold">
                        {" "}
                        year
                      </span>
                    </div>
                    <div className="text-base text-light">{userAmount}</div>
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
        <Footer/>
    </>
  );
};

export default Abonement;

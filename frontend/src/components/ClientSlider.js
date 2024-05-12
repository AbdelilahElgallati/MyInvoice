import React from "react";

// import swiper react componenet
import { Swiper, SwiperSlide } from "swiper/react";
//import 'swiper/css
import "swiper/css";
const ClientSlider = ({ clients }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      grabCursor={true}
      loop={true}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        1170: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
    >
      {clients &&
        clients.map((client, index) => {
          // const { message , image , name ,position , borderColor}=client;
          //slide
          return (
            <SwiperSlide
              key={index}
              style={{ borderColor: client.borderColor }}
              className="border-t-[10px] rounded-t-[12px]"
            >
              {/* card */}
              <div
                className="w-full mx-auto lg:max-w-[300px] xl:max-w-[350px] h-[250px] rounded-[12px] border
             border-grey py-6 px-[30px]  "
              >
                {/* card message */}
                <div className=" dark:text-white mb-[30px] font-Quicksand font-medium">
                  {client.message}
                </div>
                {/* person name, img , position */}
                <div className="flex gap-x-[10px] items-center">
                  <img
                    className="w-[30%]"
                    src={`http://localhost:3001/Images/${client.image}`}
                    alt=""
                  />
                  <div className="dark:text-white font-bold font-Quicksand">
                    {client.name}
                  </div>
                  <div className="text-light font-Quicksand">
                    {client.position}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default ClientSlider;
